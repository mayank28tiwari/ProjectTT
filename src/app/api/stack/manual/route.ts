// POST /api/stack/manual — Manually add stack entities
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { normalizeName, applyAlias } from "@/lib/stack/normalize";

interface StackInput {
    name: string;
    ecosystem: "node" | "python" | "cloud" | "other";
    version?: string;
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { items } = body as { items: StackInput[] };

    if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: "items array is required" }, { status: 400 });
    }

    const created = await Promise.all(
        items.map(async (item) => {
            const rawNormalized = normalizeName(item.name);
            const aliasedName = applyAlias(rawNormalized);

            return prisma.stackEntity.upsert({
                where: {
                    userId_normalizedName_ecosystem: {
                        userId,
                        normalizedName: aliasedName,
                        ecosystem: item.ecosystem,
                    },
                },
                update: { version: item.version || null },
                create: {
                    userId,
                    name: item.name,
                    normalizedName: aliasedName,
                    ecosystem: item.ecosystem,
                    version: item.version || null,
                },
            });
        })
    );

    return NextResponse.json({ items: created, count: created.length }, { status: 201 });
}
