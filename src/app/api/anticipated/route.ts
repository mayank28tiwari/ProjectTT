// GET /api/anticipated — Paginated anticipated items
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const status = url.searchParams.get("status");
    const confidence = url.searchParams.get("confidence");
    const cursor = url.searchParams.get("cursor");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 50);

    const where: Record<string, any> = {};
    if (status) where.status = status;
    if (confidence) where.confidence = confidence;

    const items = await prisma.anticipatedItem.findMany({
        where,
        orderBy: { lastCheckedAt: "desc" },
        take: limit + 1,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return NextResponse.json({ items: result, nextCursor, hasMore });
}
