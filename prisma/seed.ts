// prisma/seed.ts — Seed the DB with mock signals and FeedMeta
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Upsert FeedMeta singleton
    await prisma.feedMeta.upsert({
        where: { id: "singleton" },
        update: { tokenStreamLastFlowedAt: new Date(), ingestionLastRunAt: new Date() },
        create: { id: "singleton" },
    });

    // Mock signals matching M1 Signal Standard
    const mockSignals = [
        {
            title: "OpenAI Python SDK v1.50.0: New Responses API with streaming",
            summary: "Major SDK release adds native Responses API support with streaming, structured outputs, and tool-use capabilities.",
            whyItMatters: "Adds native support for the new Responses API, enabling structured outputs and tool use with streaming. Breaking: Completion.create() is now async-only.",
            whoShouldCare: "AI Engineers using OpenAI Python SDK, teams with production LLM pipelines.",
            category: "AI",
            impactLabel: "NewCapability",
            importance: "Important",
            entities: ["openai-python", "openai"],
            sourceType: "github",
            sourceName: "GitHub",
            sourceUrl: "https://github.com/openai/openai-python/releases/tag/v1.50.0",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            citations: [{ url: "https://github.com/openai/openai-python/releases/tag/v1.50.0", title: "Release Notes" }],
        },
        {
            title: "Next.js 15.1: React 19 is now the default",
            summary: "React 19 becomes the default React version in Next.js 15.1, with App Router as the recommended default.",
            whyItMatters: "React 19 is now the default React version. Pages using older React patterns may need migration.",
            whoShouldCare: "Frontend engineers, full-stack developers using Next.js in production.",
            category: "Web",
            impactLabel: "BreakingChange",
            importance: "Critical",
            entities: ["next.js", "react"],
            sourceType: "github",
            sourceName: "GitHub",
            sourceUrl: "https://github.com/vercel/next.js/releases/tag/v15.1.0",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            citations: [{ url: "https://github.com/vercel/next.js/releases/tag/v15.1.0", title: "Release Notes" }],
        },
        {
            title: "Critical Vulnerability: axios < 1.7.5 allows SSRF",
            summary: "Server-Side Request Forgery vulnerability discovered in axios affecting all versions below 1.7.5.",
            whyItMatters: "Server-Side Request Forgery vulnerability in axios affects all versions below 1.7.5. Upgrade immediately.",
            whoShouldCare: "Backend engineers, security teams, anyone using axios for server-side HTTP calls.",
            category: "Security",
            impactLabel: "SecurityFix",
            importance: "Critical",
            entities: ["axios"],
            sourceType: "osv",
            sourceName: "OSV",
            sourceUrl: "https://osv.dev/vulnerability/GHSA-1234",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            citations: [{ url: "https://github.com/axios/axios/security/advisories", title: "Security Advisory" }],
        },
        {
            title: "Kubernetes v1.32: Native sidecar containers, improved GPU scheduling",
            summary: "Sidecar containers reach GA status with built-in lifecycle management.",
            whyItMatters: "Sidecar containers are now GA with built-in lifecycle management. DRA adds better GPU/TPU scheduling.",
            whoShouldCare: "DevOps/SRE teams, platform engineers managing Kubernetes clusters.",
            category: "DevOps",
            impactLabel: "NewCapability",
            importance: "Important",
            entities: ["kubernetes"],
            sourceType: "github",
            sourceName: "GitHub",
            sourceUrl: "https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0",
            publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            citations: [{ url: "https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0", title: "Release Notes" }],
        },
        {
            title: "DuckDB v1.2.0: 3x faster JSON parsing, native Parquet compression",
            summary: "Major performance release with 3x faster JSON ingestion and native zstd Parquet support.",
            whyItMatters: "Major performance release with 3x faster JSON ingestion and native zstd Parquet support. Memory usage reduced by 40%.",
            whoShouldCare: "Data engineers, analytics teams using DuckDB for OLAP workloads.",
            category: "Data",
            impactLabel: "PerformanceImprovement",
            importance: "Important",
            entities: ["duckdb"],
            sourceType: "github",
            sourceName: "GitHub",
            sourceUrl: "https://github.com/duckdb/duckdb/releases/tag/v1.2.0",
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
            citations: [{ url: "https://github.com/duckdb/duckdb/releases/tag/v1.2.0", title: "Release Notes" }],
        },
    ];

    for (const signal of mockSignals) {
        await prisma.signal.upsert({
            where: { sourceType_sourceUrl: { sourceType: signal.sourceType, sourceUrl: signal.sourceUrl } },
            update: {},
            create: signal,
        });
    }

    console.log(`✅ Seeded ${mockSignals.length} signals + FeedMeta`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
