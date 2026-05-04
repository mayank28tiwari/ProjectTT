// POST /api/stack/upload — Upload package.json, requirements.txt, etc.
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { parsePackageJson } from "@/lib/stack/parsers/packagejson";
import { parseRequirementsTxt } from "@/lib/stack/parsers/requirements";
import { ParsedDep, normalizeName, applyAlias } from "@/lib/stack/normalize";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { content, filename } = body as { content: string; filename: string };

    if (!content || !filename) {
        return NextResponse.json({ error: "content and filename are required" }, { status: 400 });
    }

    let deps: ParsedDep[] = [];

    // Route to correct parser
    if (filename === "package.json" || filename.endsWith("/package.json")) {
        deps = parsePackageJson(content);
    } else if (filename === "requirements.txt" || filename.endsWith("/requirements.txt")) {
        deps = parseRequirementsTxt(content);
    } else {
        return NextResponse.json({ error: "Unsupported file type. Use package.json or requirements.txt." }, { status: 400 });
    }

    if (deps.length === 0) {
        return NextResponse.json({ error: "No dependencies found in file or failed to parse." }, { status: 400 });
    }

    const created = await Promise.all(
        deps.map(async (dep) => {
            const rawNormalized = normalizeName(dep.name);
            const aliasedName = applyAlias(rawNormalized);

            return prisma.stackEntity.upsert({
                where: {
                    userId_normalizedName_ecosystem: {
                        userId,
                        normalizedName: aliasedName,
                        ecosystem: dep.ecosystem,
                    },
                },
                update: { version: dep.version || null },
                create: {
                    userId,
                    name: dep.name,
                    normalizedName: aliasedName,
                    ecosystem: dep.ecosystem,
                    version: dep.version || null,
                },
            });
        })
    );

    return NextResponse.json({
        items: created,
        count: created.length,
        ecosystem: deps[0]?.ecosystem,
    }, { status: 201 });
}
