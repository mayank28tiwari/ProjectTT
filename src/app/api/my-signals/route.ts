// GET /api/my-signals — Read the user's ranked, personalized signals
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { rankSignals } from "@/lib/ranking/mySignals";
import { Signal } from "@/types/signal";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    // Cursor pagination (optional based on updatedAt or publishedAt)
    // For MVP Personalization, we rank everything in memory for small datasets, 
    // or rely on a DB query index. Here we do an in-memory rank over a large recent window.

    try {
        // 1. Fetch user's personalization data
        const [stack, follows, saved] = await Promise.all([
            prisma.stackEntity.findMany({ where: { userId } }),
            prisma.followTag.findMany({ where: { userId } }),
            prisma.savedSignal.findMany({ where: { userId } })
        ]);

        // 2. Fetch recent candidate signals (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentSignals = await prisma.signal.findMany({
            where: {
                publishedAt: { gte: thirtyDaysAgo }
            },
            take: 200 // Bound for memory
        });

        // 3. Rank Signals
        const ranked = rankSignals(recentSignals as unknown as Signal[], stack, follows, saved);

        // 4. Return top subset
        const topSignals = ranked.slice(0, limit);

        // Map `rankingTags` into the format the UI expects, and attach `isSaved`
        const savedIds = new Set(saved.map((s: { signalId: string }) => s.signalId));

        const formatted = topSignals.map(sig => ({
            ...sig,
            isSaved: savedIds.has(sig.id),
            rankingTags: sig.rankingTags // The UI will render these badges
        }));

        return NextResponse.json({
            items: formatted,
            nextCursor: null // Pagination omitted for strict ranking MVP
        });

    } catch (error: any) {
        console.error("Failed to fetch my-signals:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
