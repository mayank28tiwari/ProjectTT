// GET /api/follows — List user's followed tags
// POST /api/follows — Add a followed tag
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const follows = await prisma.followTag.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items: follows });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { tag } = body;

    if (!tag || typeof tag !== "string") {
        return NextResponse.json({ error: "tag is required" }, { status: 400 });
    }

    // Upsert to handle duplicate follows gracefully
    const follow = await prisma.followTag.upsert({
        where: { userId_tag: { userId, tag } },
        update: {},
        create: { userId, tag },
    });

    return NextResponse.json(follow, { status: 201 });
}
