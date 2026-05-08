// GET /api/signals — Paginated, filtered signal list
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma, Category, ImpactLabel, Importance } from "@prisma/client";
import { generateMockSignals } from "@/lib/api/signals";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const category = url.searchParams.get("category");
    const impactLabel = url.searchParams.get("impactLabel");
    const importance = url.searchParams.get("importance");
    const cursor = url.searchParams.get("cursor");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 50);

    // Fall back to mock signals when database is not configured
    if (!process.env.DATABASE_URL) {
        let mock = generateMockSignals();
        if (category) mock = mock.filter(s => s.category === category);
        if (impactLabel) mock = mock.filter(s => s.impactLabel === impactLabel);
        if (importance) mock = mock.filter(s => s.importance === importance);
        return NextResponse.json({ items: mock.slice(0, limit), nextCursor: null, hasMore: false });
    }

    const where: Prisma.SignalWhereInput = {};
    if (category && category in Category) where.category = category as Category;
    if (impactLabel && impactLabel in ImpactLabel) where.impactLabel = impactLabel as ImpactLabel;
    if (importance && importance in Importance) where.importance = importance as Importance;

    try {
        const signals = await prisma.signal.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            take: limit + 1,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1,
            }),
        });

        const hasMore = signals.length > limit;
        const items = hasMore ? signals.slice(0, limit) : signals;
        const nextCursor = hasMore ? items[items.length - 1].id : null;

        return NextResponse.json({ items, nextCursor, hasMore });
    } catch (error) {
        console.error("Failed to fetch signals:", error);
        return NextResponse.json({ error: "Failed to fetch signals" }, { status: 500 });
    }
}
