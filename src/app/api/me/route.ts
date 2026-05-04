// GET /api/me — Auth-required user profile with stack + follows
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const [user, follows, stack, savedCount] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, role: true, org: true, createdAt: true },
        }),
        prisma.followTag.findMany({
            where: { userId },
            select: { id: true, tag: true, createdAt: true },
        }),
        prisma.stackEntity.findMany({
            where: { userId },
            select: { id: true, name: true, version: true, ecosystem: true, createdAt: true },
        }),
        prisma.savedSignal.count({ where: { userId } }),
    ]);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
        user,
        follows,
        stack,
        savedCount,
    });
}
