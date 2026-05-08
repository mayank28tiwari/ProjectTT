import * as Sentry from "@sentry/nextjs";
import { inngest } from "@/inngest/client";
import { OsvConnector } from "@/lib/ingestion/connectors/osv";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

export const ingestOsvFn = inngest.createFunction(
  { id: "ingest-osv", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "35 * * * *" }] },
  async ({ step }) => {
    const sourceKey = SPECIAL_SOURCES.osv.key;

    const result = await step.run("fetch-osv", async () => {
      if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
      try {
        const connector = new OsvConnector();
        const { candidates } = await connector.fetch();
        let count = 0;
        for (const c of candidates) {
          const enriched = enrich(c, SPECIAL_SOURCES.osv.weight);
          const persisted = await persistCandidate(c, enriched);
          if (persisted.created) count++;
        }
        await recordSuccess(sourceKey, "osv", count);
        return { signals: count, skipped: false };
      } catch (err) {
        Sentry.captureException(err);
        await recordFailure(sourceKey, "osv", err as Error);
        throw err;
      }
    });

    await step.run("update-feed-meta", () => updateFeedMeta(result.signals));
    return { totalSignals: result.signals };
  },
);
