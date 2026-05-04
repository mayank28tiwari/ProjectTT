import { IngestionSource } from "../pipeline";
import { CandidateSignal } from "@/lib/enrichment/rules";

// Fetch recent high-impact papers from arXiv (CS/AI)
export const arxivSource: IngestionSource = {
    name: "arxiv",
    fetchCandidates: async (): Promise<CandidateSignal[]> => {
        const candidates: CandidateSignal[] = [];

        try {
            // arXiv API doesn't return JSON out of the box, it returns Atom XML.
            // Fetching recent papers in cs.AI or cs.CL
            const query = "cat:cs.AI OR cat:cs.CL";
            const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=desc&max_results=3`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`arXiv API failed: ${response.statusText}`);
            }

            const xmlText = await response.text();

            // Extremely basic XML parsing to extract Entries without bringing in heavy XML-DOM libs
            const entries = xmlText.split('<entry>').slice(1);

            for (const entry of entries) {
                const idMatch = entry.match(/<id>(.*?)<\/id>/);
                const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
                const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
                const publishedMatch = entry.match(/<published>([\s\S]*?)<\/published>/);

                if (idMatch && titleMatch && summaryMatch) {
                    const rawUrl = idMatch[1].trim();
                    const title = titleMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
                    const summary = summaryMatch[1].trim();
                    const publishedAt = publishedMatch ? publishedMatch[1] : new Date().toISOString();

                    candidates.push({
                        title,
                        sourceUrl: rawUrl,
                        rawPayload: { id: rawUrl, title, summary, publishedAt },
                        textBody: summary, // The abstract serves as the text body for the LLM
                    });
                }
            }
        } catch (e) {
            console.error("[arXiv Source] Fetch error:", e);
        }

        return candidates;
    }
};
