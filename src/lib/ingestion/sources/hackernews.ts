import { IngestionSource } from "../pipeline";
import { CandidateSignal } from "@/lib/enrichment/rules";

// Using the HackerNews Algolia API to find high-signal tech posts
export const hackernewsSource: IngestionSource = {
    name: "hn",
    fetchCandidates: async (): Promise<CandidateSignal[]> => {
        const candidates: CandidateSignal[] = [];

        try {
            // Fetch recent posts with high points (> 100)
            // Focus on technical announcements (Show HN, GitHub repos, tech blogs)
            const url = "https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>100&hitsPerPage=10";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HN API failed: ${response.statusText}`);
            }

            const data = await response.json();

            for (const hit of data.hits) {
                // Filter out highly generic domains and YC ads
                if (!hit.url || hit.url.includes("ycombinator.com") || hit.url.includes("nytimes.com")) {
                    continue;
                }

                candidates.push({
                    title: hit.title,
                    sourceUrl: hit.url, // Point to the actual article/repo, not the HN discussion
                    rawPayload: hit,
                    // HN items lack text body unless it's an Ask/Show HN without a URL.
                    // We pass the title + domain as textBody. LLM will do its best based on title.
                    // In a V2, TokenTalks would scrape the target URL.
                    textBody: `Hacker News submission: ${hit.title}. Domain: ${hit.url}`,
                });
            }
        } catch (e) {
            console.error("[HN Source] Fetch error:", e);
        }

        return candidates;
    }
};
