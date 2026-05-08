// GET /api/meta — FeedMeta (singleton)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json({
            id: "singleton",
            tokenStreamLastFlowedAt: new Date().toISOString(),
            ingestionLastRunAt: new Date().toISOString(),
        });
    }

    try {
        const meta = await prisma.feedMeta.upsert({
            where: { id: 1 },
            update: {},
            create: { id: 1 },
        });
        return NextResponse.json(meta);
    } catch (error) {
        console.error("Failed to fetch meta:", error);
        return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
    }
}
