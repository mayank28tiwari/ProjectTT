// ─────────────────────────────────────────────────────
// M4 Cron Endpoint — /api/jobs/run
// Protected by CRON_SECRET, triggers ingestion for specified sources.
// ─────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { runIngestion } from "@/lib/ingestion/pipeline";
import { githubSource } from "@/lib/ingestion/sources/github";
// Other sources would be imported here...

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const expectedToken = `Bearer ${process.env.CRON_SECRET || "my-super-secret-cron-token"}`;

    // Protect endpoint
    if (authHeader !== expectedToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = req.nextUrl;
    const sourceParam = url.searchParams.get("source") || "all";

    const results: Record<string, any> = {};

    try {
        if (sourceParam === "github" || sourceParam === "all") {
            results.github = await runIngestion(githubSource);
        }

        // Additional sources like osv, arxiv, hn would be chained here
        // Example:
        // if (sourceParam === "osv" || sourceParam === "all") {
        //   results.osv = await runIngestion(osvSource);
        // }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error("[CRON] Run failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
