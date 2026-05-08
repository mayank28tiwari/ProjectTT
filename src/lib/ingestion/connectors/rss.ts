import { XMLParser } from "fast-xml-parser";
import { fetchWithRetry } from "../http";
import { shouldDrop } from "../filters";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import type { RSS_FEEDS } from "@/lib/sources/rss-feeds";

type FeedEntry = (typeof RSS_FEEDS)[number];

export class RssConnector implements Connector {
  sourceKey: string;
  sourceType = "rss" as const;

  private feed: FeedEntry;
  private parser: XMLParser;

  constructor(feed: FeedEntry) {
    this.feed = feed;
    this.sourceKey = `rss:${feed.key}`;
    this.parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  }

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    try {
      const res = await fetchWithRetry(this.feed.url);
      const xml = await res.text();
      const parsed = this.parser.parse(xml);

      const items: unknown[] = this.extractItems(parsed);

      for (const item of items) {
        try {
          const candidate = this.parseItem(item);
          if (candidate && !shouldDrop(candidate, this.feed.key)) {
            candidates.push(candidate);
          }
        } catch (err) {
          errors.push({ item: String(item), error: String(err) });
        }
      }
    } catch (err) {
      errors.push({ item: this.feed.url, error: String(err) });
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }

  private extractItems(parsed: Record<string, unknown>): unknown[] {
    // RSS 2.0
    const rss = parsed["rss"] as Record<string, unknown> | undefined;
    if (rss) {
      const channel = rss["channel"] as Record<string, unknown> | undefined;
      if (channel) {
        const items = channel["item"];
        return Array.isArray(items) ? items : items ? [items] : [];
      }
    }
    // Atom
    const feed = parsed["feed"] as Record<string, unknown> | undefined;
    if (feed) {
      const entries = feed["entry"];
      return Array.isArray(entries) ? entries : entries ? [entries] : [];
    }
    return [];
  }

  private parseItem(item: unknown): RawCandidate | null {
    const i = item as Record<string, unknown>;

    const title = String(i["title"] ?? "").trim();
    if (!title) return null;

    // URL — handle link as string or Atom link object
    let url = "";
    if (typeof i["link"] === "string") {
      url = i["link"];
    } else if (i["link"] && typeof i["link"] === "object") {
      const link = i["link"] as Record<string, unknown>;
      url = String(link["@_href"] ?? link["#text"] ?? "");
    }
    if (!url) url = String(i["id"] ?? "");
    if (!url) return null;

    // Published date
    const rawDate =
      i["pubDate"] ?? i["published"] ?? i["updated"] ?? i["dc:date"];
    const publishedAt = rawDate ? new Date(String(rawDate)) : new Date();
    const validDate = !isNaN(publishedAt.getTime()) ? publishedAt : new Date();

    const rawText = String(
      i["description"] ?? i["content"] ?? i["summary"] ?? "",
    ).replace(/<[^>]+>/g, "");

    return {
      sourceType: "rss",
      sourceKey: this.sourceKey,
      sourceName: this.feed.name,
      sourceUrl: url,
      title,
      rawText: rawText.slice(0, 2000),
      publishedAt: validDate,
      payload: item,
      metadata: { suggestedCategory: this.feed.category },
    };
  }
}
