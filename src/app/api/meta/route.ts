import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      tokenStreamLastFlowedAt: null,
      totalPublished: 0,
      sourcesActive: 0,
      sourcesDisabled: 0,
    });
  }

  try {
    const [meta, sources] = await Promise.all([
      prisma.feedMeta.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
      prisma.sourceHealth.groupBy({ by: ["enabled"], _count: { _all: true } }),
    ]);

    const sourcesActive = sources.find((r) => r.enabled)?._count._all ?? 0;
    const sourcesDisabled = sources.find((r) => !r.enabled)?._count._all ?? 0;

    return NextResponse.json({
      tokenStreamLastFlowedAt: meta.tokenStreamLastFlowedAt?.toISOString() ?? null,
      totalPublished: meta.totalSignalsPublished,
      sourcesActive,
      sourcesDisabled,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to fetch meta:", error);
    return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
  }
}
