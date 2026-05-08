import { XMLParser } from "fast-xml-parser";
import { fetchWithRetry } from "../http";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

export class ArxivConnector implements Connector {
  sourceKey = SPECIAL_SOURCES.arxiv.key;
  sourceType = "arxiv" as const;

  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  }

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    try {
      const res = await fetchWithRetry(SPECIAL_SOURCES.arxiv.queryUrl);
      const xml = await res.text();
      const parsed = this.parser.parse(xml) as Record<string, unknown>;

      const feed = parsed["feed"] as Record<string, unknown> | undefined;
      if (!feed) return { sourceKey: this.sourceKey, candidates, errors };

      const entries = feed["entry"];
      const items: unknown[] = Array.isArray(entries) ? entries : entries ? [entries] : [];

      for (const entry of items) {
        try {
          const e = entry as Record<string, unknown>;
          const title = String(e["title"] ?? "").replace(/\s+/g, " ").trim();
          const summary = String(e["summary"] ?? "").replace(/\s+/g, " ").trim();
          const published = String(e["published"] ?? "");

          // arxiv id is the abs URL
          let url = "";
          const links = e["link"];
          const linkArr: unknown[] = Array.isArray(links) ? links : links ? [links] : [];
          for (const l of linkArr) {
            const lObj = l as Record<string, string>;
            if (lObj["@_rel"] === "alternate" || !lObj["@_rel"]) {
              url = lObj["@_href"] ?? "";
              break;
            }
          }
          if (!url) url = String(e["id"] ?? "");
          if (!url) continue;

          candidates.push({
            sourceType: "arxiv",
            sourceKey: this.sourceKey,
            sourceName: SPECIAL_SOURCES.arxiv.name,
            sourceUrl: url,
            sourceId: url,
            title,
            rawText: summary.slice(0, 2000),
            publishedAt: published ? new Date(published) : new Date(),
            payload: entry,
            metadata: { suggestedCategory: "Research" },
          });
        } catch (err) {
          errors.push({ item: String(entry), error: String(err) });
        }
      }
    } catch (err) {
      errors.push({ item: SPECIAL_SOURCES.arxiv.queryUrl, error: String(err) });
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }
}
