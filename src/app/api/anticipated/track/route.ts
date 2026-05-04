// POST /api/anticipated/track — Track an anticipated item
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { anticipatedId } = body;

    if (!anticipatedId || typeof anticipatedId !== "string") {
        return NextResponse.json({ error: "anticipatedId is required" }, { status: 400 });
    }

    // Verify item exists
    const item = await prisma.anticipatedItem.findUnique({ where: { id: anticipatedId } });
    if (!item) {
        return NextResponse.json({ error: "Anticipated item not found" }, { status: 404 });
    }

    // Toggle tracking
    const existing = await prisma.trackedAnticipated.findUnique({
        where: { userId_anticipatedId: { userId, anticipatedId } },
    });

    if (existing) {
        await prisma.trackedAnticipated.delete({ where: { id: existing.id } });
        return NextResponse.json({ tracked: false, anticipatedId });
    }

    await prisma.trackedAnticipated.create({
        data: { userId, anticipatedId },
    });

    return NextResponse.json({ tracked: true, anticipatedId });
}
