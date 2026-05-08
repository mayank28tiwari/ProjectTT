import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma, Category, ImpactLabel, Importance } from "@prisma/client";
import { getRedis } from "@/lib/redis";
import { createHash } from "crypto";
import * as Sentry from "@sentry/nextjs";
import { generateMockSignals } from "@/lib/api/signals";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;
const CACHE_TTL = 30;
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60;

function queryHash(params: Record<string, string>): string {
  return createHash("sha256")
    .update(JSON.stringify(params, Object.keys(params).sort()))
    .digest("hex")
    .slice(0, 16);
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  const key = `rl:signals:${ip}`;
  const now = Date.now();
  const window = now - RATE_LIMIT_WINDOW * 1000;
  await redis.zremrangebyscore(key, 0, window);
  const count = await redis.zcard(key);
  if (count >= RATE_LIMIT_MAX) return false;
  await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });
  await redis.expire(key, RATE_LIMIT_WINDOW * 2);
  return true;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const url = req.nextUrl;
  const category = url.searchParams.get("category") ?? undefined;
  const impact = url.searchParams.get("impact") ?? undefined;
  const importance = url.searchParams.get("importance") ?? undefined;
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const limitParam = parseInt(url.searchParams.get("limit") ?? String(DEFAULT_LIMIT), 10);
  const limit = Math.min(isNaN(limitParam) ? DEFAULT_LIMIT : limitParam, MAX_LIMIT);

  if (!process.env.DATABASE_URL) {
    let mock = generateMockSignals();
    if (category) mock = mock.filter((s) => s.category === category);
    if (impact) mock = mock.filter((s) => s.impactLabel === impact);
    if (importance) mock = mock.filter((s) => s.importance === importance);
    const page = mock.slice(0, limit);
    return NextResponse.json({
      data: page,
      nextCursor: null,
      feedMeta: { tokenStreamLastFlowedAt: null, totalPublished: mock.length },
    });
  }

  const params: Record<string, string> = { category: category ?? "", impact: impact ?? "", importance: importance ?? "", cursor: cursor ?? "", limit: String(limit) };
  const cacheKey = `signals:${queryHash(params)}`;
  const redis = getRedis();

  if (redis) {
    const cached = await redis.get<string>(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }
  }

  const where: Prisma.SignalWhereInput = {};
  if (cursor) where.id = { lt: cursor };
  if (category && category in Category) where.category = category as Category;
  if (impact && impact in ImpactLabel) where.impactLabel = impact as ImpactLabel;
  if (importance && importance in Importance) where.importance = importance as Importance;

  try {
    const [signals, meta] = await Promise.all([
      prisma.signal.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
        take: limit + 1,
      }),
      prisma.feedMeta.findUnique({ where: { id: 1 } }),
    ]);

    const hasMore = signals.length > limit;
    const data = hasMore ? signals.slice(0, limit) : signals;
    const nextCursor = hasMore ? data[data.length - 1].id : null;

    const body = {
      data,
      nextCursor,
      feedMeta: {
        tokenStreamLastFlowedAt: meta?.tokenStreamLastFlowedAt?.toISOString() ?? null,
        totalPublished: meta?.totalSignalsPublished ?? 0,
      },
    };

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(body), { ex: CACHE_TTL });
    }

    return NextResponse.json(body);
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to fetch signals:", error);
    return NextResponse.json({ error: "Failed to fetch signals" }, { status: 500 });
  }
}
