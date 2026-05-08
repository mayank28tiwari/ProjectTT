import { fetchWithRetry } from "../http";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

interface OsvVuln {
  id: string;
  summary?: string;
  details?: string;
  published: string;
  modified: string;
  affected?: { package?: { name: string; ecosystem: string }; ranges?: unknown[] }[];
  references?: { url: string }[];
}

export class OsvConnector implements Connector {
  sourceKey = SPECIAL_SOURCES.osv.key;
  sourceType = "osv" as const;

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    for (const ecosystem of SPECIAL_SOURCES.osv.ecosystems) {
      try {
        const res = await fetchWithRetry(SPECIAL_SOURCES.osv.queryUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ package: { ecosystem } }),
        });

        if (!res.ok) {
          errors.push({ item: ecosystem, error: `HTTP ${res.status}` });
          continue;
        }

        const data = (await res.json()) as { vulns?: OsvVuln[] };
        const vulns = data.vulns ?? [];

        for (const vuln of vulns.slice(0, 20)) {
          const pkg = vuln.affected?.[0]?.package;
          const url = vuln.references?.[0]?.url ?? `https://osv.dev/vulnerability/${vuln.id}`;
          const title = `[${ecosystem}] ${vuln.id}: ${vuln.summary ?? "Security vulnerability"}`;
          const rawText = (vuln.details ?? vuln.summary ?? "").slice(0, 2000);

          candidates.push({
            sourceType: "osv",
            sourceKey: this.sourceKey,
            sourceName: SPECIAL_SOURCES.osv.name,
            sourceUrl: url,
            sourceId: vuln.id,
            title,
            rawText,
            publishedAt: new Date(vuln.published),
            payload: vuln,
            metadata: {
              suggestedCategory: "Security",
              suggestedImpactLabel: "SecurityFix",
              knownEntities: pkg ? [pkg.name.toLowerCase()] : [],
            },
          });
        }
      } catch (err) {
        errors.push({ item: ecosystem, error: String(err) });
      }
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }
}
