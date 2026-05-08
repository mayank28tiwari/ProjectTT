import { inngest } from "@/inngest/client";
import { ArxivConnector } from "@/lib/ingestion/connectors/arxiv";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

export const ingestArxivFn = inngest.createFunction(
  { id: "ingest-arxiv", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "45 */3 * * *" }] },
  async ({ step }) => {
    const sourceKey = SPECIAL_SOURCES.arxiv.key;

    const result = await step.run("fetch-arxiv", async () => {
      if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
      try {
        const connector = new ArxivConnector();
        const { candidates } = await connector.fetch();
        let count = 0;
        for (const c of candidates) {
          const enriched = enrich(c, SPECIAL_SOURCES.arxiv.weight);
          const persisted = await persistCandidate(c, enriched);
          if (persisted.created) count++;
        }
        await recordSuccess(sourceKey, "arxiv", count);
        return { signals: count, skipped: false };
      } catch (err) {
        await recordFailure(sourceKey, "arxiv", err as Error);
        throw err;
      }
    });

    await step.run("update-feed-meta", () => updateFeedMeta(result.signals));
    return { totalSignals: result.signals };
  },
);
