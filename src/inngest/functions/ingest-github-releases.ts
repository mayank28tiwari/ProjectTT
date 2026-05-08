import { inngest } from "@/inngest/client";
import { GITHUB_REPOS } from "@/lib/sources/github-repos";
import { GithubReleasesConnector } from "@/lib/ingestion/connectors/github-releases";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate, updateFeedMeta } from "@/lib/ingestion/persist";
import { recordSuccess, recordFailure, isSourceEnabled } from "@/lib/ingestion/source-health";

export const ingestGithubReleasesFn = inngest.createFunction(
  { id: "ingest-github-releases", concurrency: { limit: 1 }, retries: 3, triggers: [{ cron: "5 * * * *" }] },
  async ({ step }) => {
    const token = process.env.GITHUB_TOKEN ?? "";
    let totalSignals = 0;

    for (const repo of GITHUB_REPOS) {
      const sourceKey = `github:${repo.owner}/${repo.repo}`;

      const result = await step.run(`fetch-${repo.owner}-${repo.repo}`, async () => {
        if (!(await isSourceEnabled(sourceKey))) return { signals: 0, skipped: true };
        try {
          const connector = new GithubReleasesConnector(repo, token);
          const { candidates } = await connector.fetch();
          let count = 0;
          for (const c of candidates) {
            const enriched = enrich(c, repo.weight);
            const persisted = await persistCandidate(c, enriched);
            if (persisted.created) count++;
          }
          await recordSuccess(sourceKey, "github_release", count);
          return { signals: count, skipped: false };
        } catch (err) {
          await recordFailure(sourceKey, "github_release", err as Error);
          throw err;
        }
      });

      totalSignals += result.signals;
    }

    await step.run("update-feed-meta", () => updateFeedMeta(totalSignals));
    return { totalSignals };
  },
);
