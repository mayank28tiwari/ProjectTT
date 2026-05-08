import * as Sentry from "@sentry/nextjs";
import { inngest } from "@/inngest/client";
import { GhsaConnector } from "@/lib/ingestion/connectors/ghsa";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

export const ingestGhsaFn = inngest.createFunction(
  { id: "ingest-ghsa", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "25 * * * *" }] },
  async ({ step }) => {
    const sourceKey = SPECIAL_SOURCES.ghsa.key;
    const token = process.env.GITHUB_TOKEN ?? "";

    const result = await step.run("fetch-ghsa", async () => {
      if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
      try {
        const connector = new GhsaConnector(token);
        const { candidates } = await connector.fetch();
        let count = 0;
        for (const c of candidates) {
          const enriched = enrich(c, SPECIAL_SOURCES.ghsa.weight);
          const persisted = await persistCandidate(c, enriched);
          if (persisted.created) count++;
        }
        await recordSuccess(sourceKey, "github_advisory", count);
        return { signals: count, skipped: false };
      } catch (err) {
        Sentry.captureException(err);
        await recordFailure(sourceKey, "github_advisory", err as Error);
        throw err;
      }
    });

    await step.run("update-feed-meta", () => updateFeedMeta(result.signals));
    return { totalSignals: result.signals };
  },
);
