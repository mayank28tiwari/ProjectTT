import { fetchWithRetry } from "../http";
import { shouldDrop } from "../filters";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";
import { KNOWN_ENTITIES } from "@/lib/enrichment/entities";

interface HnHit {
  objectID: string;
  title: string;
  url?: string;
  story_text?: string;
  points: number;
  created_at: string;
  author: string;
}

function mentionsKnownEntity(text: string): boolean {
  const lower = text.toLowerCase();
  for (const entity of KNOWN_ENTITIES) {
    const terms = [entity.canonical, ...entity.aliases];
    for (const term of terms) {
      if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(lower)) {
        return true;
      }
    }
  }
  return false;
}

export class HackerNewsConnector implements Connector {
  sourceKey = SPECIAL_SOURCES.hackernews.key;
  sourceType = "hackernews" as const;

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    try {
      const res = await fetchWithRetry(SPECIAL_SOURCES.hackernews.queryUrl);
      const data = (await res.json()) as { hits?: HnHit[] };
      const hits = data.hits ?? [];

      for (const hit of hits) {
        const url = hit.url ?? "";
        const rawText = (hit.story_text ?? "").replace(/<[^>]+>/g, "").slice(0, 2000);

        const candidate: RawCandidate = {
          sourceType: "hackernews",
          sourceKey: this.sourceKey,
          sourceName: SPECIAL_SOURCES.hackernews.name,
          sourceUrl: url,
          sourceId: hit.objectID,
          title: hit.title,
          rawText,
          publishedAt: new Date(hit.created_at),
          payload: hit,
          metadata: { suggestedCategory: "Tools" },
        };

        if (shouldDrop(candidate, "hackernews")) continue;
        if (!mentionsKnownEntity(hit.title + " " + (hit.url ?? ""))) continue;

        candidates.push(candidate);
      }
    } catch (err) {
      errors.push({ item: SPECIAL_SOURCES.hackernews.queryUrl, error: String(err) });
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }
}
