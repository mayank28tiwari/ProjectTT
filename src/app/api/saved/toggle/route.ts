// POST /api/saved/toggle — Toggle save/unsave a signal (dedupe-safe)
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
    const { signalId } = body;

    if (!signalId || typeof signalId !== "string") {
        return NextResponse.json({ error: "signalId is required" }, { status: 400 });
    }

    // Check if already saved
    const existing = await prisma.savedSignal.findUnique({
        where: { userId_signalId: { userId, signalId } },
    });

    if (existing) {
        // Unsave
        await prisma.savedSignal.delete({ where: { id: existing.id } });
        return NextResponse.json({ saved: false, signalId });
    }

    // Save — verify signal exists first
    const signal = await prisma.signal.findUnique({ where: { id: signalId } });
    if (!signal) {
        return NextResponse.json({ error: "Signal not found" }, { status: 404 });
    }

    await prisma.savedSignal.create({
        data: { userId, signalId },
    });

    return NextResponse.json({ saved: true, signalId });
}
