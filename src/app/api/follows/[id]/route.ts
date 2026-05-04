// DELETE /api/follows/[id] — Unfollow a tag
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id } = await params;

    // Verify ownership
    const follow = await prisma.followTag.findFirst({
        where: { id, userId },
    });

    if (!follow) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.followTag.delete({ where: { id } });

    return NextResponse.json({ deleted: true, id });
}
