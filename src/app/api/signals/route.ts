// GET /api/signals — Paginated, filtered signal list
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const category = url.searchParams.get("category");
    const impactLabel = url.searchParams.get("impactLabel");
    const importance = url.searchParams.get("importance");
    const cursor = url.searchParams.get("cursor");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 50);

    const where: Prisma.SignalWhereInput = {};
    if (category) where.category = category;
    if (impactLabel) where.impactLabel = impactLabel;
    if (importance) where.importance = importance;

    const signals = await prisma.signal.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        take: limit + 1, // fetch one extra to detect next page
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),
    });

    const hasMore = signals.length > limit;
    const items = hasMore ? signals.slice(0, limit) : signals;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({
        items,
        nextCursor,
        hasMore,
    });
}
