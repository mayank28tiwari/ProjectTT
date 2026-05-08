import * as Sentry from "@sentry/nextjs";
import { inngest } from "@/inngest/client";
import { RSS_FEEDS } from "@/lib/sources/rss-feeds";
import { RssConnector } from "@/lib/ingestion/connectors/rss";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";

export const ingestRssFn = inngest.createFunction(
  { id: "ingest-rss", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "15 * * * *" }] },
  async ({ step }) => {
    let totalSignals = 0;

    for (const feed of RSS_FEEDS) {
      const sourceKey = `rss:${feed.key}`;

      const result = await step.run(`fetch-${feed.key}`, async () => {
        if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
        try {
          const connector = new RssConnector(feed);
          const { candidates } = await connector.fetch();
          let count = 0;
          for (const c of candidates) {
            const enriched = enrich(c, feed.weight);
            const persisted = await persistCandidate(c, enriched);
            if (persisted.created) count++;
          }
          await recordSuccess(sourceKey, "rss", count);
          return { signals: count, skipped: false };
        } catch (err) {
          Sentry.captureException(err);
          await recordFailure(sourceKey, "rss", err as Error);
          throw err;
        }
      });

      totalSignals += result.signals;
    }

    await step.run("update-feed-meta", () => updateFeedMeta(totalSignals));
    return { totalSignals };
  },
);
