import * as Sentry from "@sentry/nextjs";
import { inngest } from "@/inngest/client";
import { HackerNewsConnector } from "@/lib/ingestion/connectors/hackernews";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

export const ingestHackerNewsFn = inngest.createFunction(
  { id: "ingest-hackernews", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "55 * * * *" }] },
  async ({ step }) => {
    const sourceKey = SPECIAL_SOURCES.hackernews.key;

    const result = await step.run("fetch-hackernews", async () => {
      if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
      try {
        const connector = new HackerNewsConnector();
        const { candidates } = await connector.fetch();
        let count = 0;
        for (const c of candidates) {
          const enriched = enrich(c, SPECIAL_SOURCES.hackernews.weight);
          const persisted = await persistCandidate(c, enriched);
          if (persisted.created) count++;
        }
        await recordSuccess(sourceKey, "hackernews", count);
        return { signals: count, skipped: false };
      } catch (err) {
        Sentry.captureException(err);
        await recordFailure(sourceKey, "hackernews", err as Error);
        throw err;
      }
    });

    await step.run("update-feed-meta", () => updateFeedMeta(result.signals));
    return { totalSignals: result.signals };
  },
);
