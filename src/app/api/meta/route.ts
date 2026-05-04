// GET /api/meta — FeedMeta (singleton)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    // Upsert the singleton — ensures it always exists
    const meta = await prisma.feedMeta.upsert({
        where: { id: "singleton" },
        update: {},
        create: {
            id: "singleton",
            tokenStreamLastFlowedAt: new Date(),
            ingestionLastRunAt: new Date(),
        },
    });

    return NextResponse.json(meta);
}
