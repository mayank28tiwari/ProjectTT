import { IngestionSource } from "../pipeline";
import { CandidateSignal } from "@/lib/enrichment/rules";

// Fetch recent vulnerabilities affecting major ecosystems
export const osvSource: IngestionSource = {
    name: "osv",
    fetchCandidates: async (): Promise<CandidateSignal[]> => {
        const candidates: CandidateSignal[] = [];

        try {
            // Fetch recent vulnerabilities (mocking a recent time query via POST)
            // Since OSV has a complex query system, we'll fetch a known high-impact package for MVP
            // In production, this would query a timestamp range across eco-systems

            const payload = {
                package: {
                    name: "axios",
                    ecosystem: "npm"
                }
            };

            const response = await fetch("https://api.osv.dev/v1/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`OSV API failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.vulns) {
                for (const vuln of data.vulns.slice(0, 3) as any[]) {
                    // OSV vulnerabilities usually have a GHSA or CVE ID as alias
                    const title = vuln.summary || `Vulnerability in ${payload.package.name} (${vuln.id})`;
                    const sourceUrl = `https://osv.dev/vulnerability/${vuln.id}`;

                    candidates.push({
                        title,
                        sourceUrl,
                        rawPayload: vuln,
                        textBody: vuln.details || title, // Details contains the Markdown explanation
                    });
                }
            }
        } catch (e) {
            console.error("[OSV Source] Fetch error:", e);
        }

        return candidates;
    }
};
