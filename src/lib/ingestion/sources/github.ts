import { IngestionSource } from "../pipeline";
import { CandidateSignal } from "@/lib/enrichment/rules";

const TARGET_REPOS = [
    "vercel/next.js",
    "microsoft/typescript",
    "facebook/react",
    "duckdb/duckdb",
    "openai/openai-python",
    "kubernetes/kubernetes"
];

export const githubSource: IngestionSource = {
    name: "github",
    fetchCandidates: async (): Promise<CandidateSignal[]> => {
        const candidates: CandidateSignal[] = [];
        const headers: Record<string, string> = { "User-Agent": "TokenTalks-Ingestion" };

        if (process.env.GITHUB_SECRET) {
            // In a real app, use personal access token to boost rate limits
            headers["Authorization"] = `Bearer ${process.env.GITHUB_SECRET}`;
        }

        // Only fetch recent to save API calls
        for (const repo of TARGET_REPOS) {
            try {
                const url = `https://api.github.com/repos/${repo}/releases?per_page=3`;
                const response = await fetch(url, { headers });

                if (!response.ok) {
                    console.warn(`[GitHub Source] Failed to fetch ${repo}: ${response.statusText}`);
                    continue;
                }

                const releases = await response.json();

                for (const release of releases) {
                    // Exclude extreme spam (empty bodies)
                    if (!release.body || !release.html_url) continue;

                    candidates.push({
                        title: `${repo} ${release.name || release.tag_name}`,
                        sourceUrl: release.html_url,
                        rawPayload: release, // store raw API response
                        textBody: release.body, // Text to enrich
                    });
                }
            } catch (e) {
                console.error(`[GitHub Source] Fetch error for ${repo}:`, e);
            }
        }

        return candidates;
    }
};
