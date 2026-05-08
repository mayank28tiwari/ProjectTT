import { RSS_FEEDS } from "@/lib/sources/rss-feeds";
import { GITHUB_REPOS } from "@/lib/sources/github-repos";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";
import { RssConnector } from "@/lib/ingestion/connectors/rss";
import { GithubReleasesConnector } from "@/lib/ingestion/connectors/github-releases";
import { GhsaConnector } from "@/lib/ingestion/connectors/ghsa";
import { OsvConnector } from "@/lib/ingestion/connectors/osv";
import { ArxivConnector } from "@/lib/ingestion/connectors/arxiv";
import { HackerNewsConnector } from "@/lib/ingestion/connectors/hackernews";
import { enrich } from "@/lib/enrichment/pipeline";
import { persistCandidate } from "@/lib/ingestion/persist";
import { prisma } from "@/lib/db/prisma";

interface SourceResult {
  sourceKey: string;
  candidates: number;
  persisted: number;
  errors: string[];
  ok: boolean;
}

const token = process.env.GITHUB_TOKEN ?? "";

async function runRss(): Promise<SourceResult[]> {
  const results: SourceResult[] = [];
  for (const feed of RSS_FEEDS) {
    const sourceKey = `rss:${feed.key}`;
    try {
      const { candidates, errors } = await new RssConnector(feed).fetch();
      let persisted = 0;
      for (const c of candidates) {
        const enriched = enrich(c, feed.weight);
        const r = await persistCandidate(c, enriched);
        if (r.created) persisted++;
      }
      results.push({ sourceKey, candidates: candidates.length, persisted, errors: errors.map((e) => e.error), ok: candidates.length > 0 });
    } catch (err) {
      results.push({ sourceKey, candidates: 0, persisted: 0, errors: [String(err)], ok: false });
    }
  }
  return results;
}

async function runGithubReleases(): Promise<SourceResult[]> {
  const results: SourceResult[] = [];
  for (const repo of GITHUB_REPOS) {
    const sourceKey = `github:${repo.owner}/${repo.repo}`;
    try {
      const { candidates, errors } = await new GithubReleasesConnector(repo, token).fetch();
      let persisted = 0;
      for (const c of candidates) {
        const enriched = enrich(c, repo.weight);
        const r = await persistCandidate(c, enriched);
        if (r.created) persisted++;
      }
      results.push({ sourceKey, candidates: candidates.length, persisted, errors: errors.map((e) => e.error), ok: candidates.length > 0 });
    } catch (err) {
      results.push({ sourceKey, candidates: 0, persisted: 0, errors: [String(err)], ok: false });
    }
  }
  return results;
}

async function runSpecial(name: string, connector: { fetch(): Promise<{ candidates: { sourceType: unknown; sourceKey: string; sourceName: string; sourceUrl: string; title: string; rawText: string; publishedAt: Date; payload: unknown }[]; errors: { item: string; error: string }[] }> }, weight: number): Promise<SourceResult> {
  try {
    const { candidates, errors } = await connector.fetch();
    let persisted = 0;
    for (const c of candidates) {
      const enriched = enrich(c as Parameters<typeof enrich>[0], weight);
      const r = await persistCandidate(c as Parameters<typeof persistCandidate>[0], enriched);
      if (r.created) persisted++;
    }
    return { sourceKey: name, candidates: candidates.length, persisted, errors: errors.map((e) => e.error), ok: candidates.length > 0 };
  } catch (err) {
    return { sourceKey: name, candidates: 0, persisted: 0, errors: [String(err)], ok: false };
  }
}

function printResult(r: SourceResult) {
  const status = r.ok ? "✓" : "✗";
  console.log(`${status} ${r.sourceKey}: ${r.candidates} fetched, ${r.persisted} new`);
  for (const e of r.errors) {
    console.log(`  ! ${e}`);
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set — cannot persist signals");
    process.exit(1);
  }

  console.log("=== TokenTalks Ingest Test ===\n");

  const allResults: SourceResult[] = [];

  console.log("--- RSS feeds ---");
  const rssResults = await runRss();
  rssResults.forEach(printResult);
  allResults.push(...rssResults);

  console.log("\n--- GitHub Releases ---");
  const ghResults = await runGithubReleases();
  ghResults.forEach(printResult);
  allResults.push(...ghResults);

  console.log("\n--- GHSA ---");
  const ghsaResult = await runSpecial(SPECIAL_SOURCES.ghsa.key, new GhsaConnector(token), SPECIAL_SOURCES.ghsa.weight);
  printResult(ghsaResult);
  allResults.push(ghsaResult);

  console.log("\n--- OSV ---");
  const osvResult = await runSpecial(SPECIAL_SOURCES.osv.key, new OsvConnector(), SPECIAL_SOURCES.osv.weight);
  printResult(osvResult);
  allResults.push(osvResult);

  console.log("\n--- arXiv ---");
  const arxivResult = await runSpecial(SPECIAL_SOURCES.arxiv.key, new ArxivConnector(), SPECIAL_SOURCES.arxiv.weight);
  printResult(arxivResult);
  allResults.push(arxivResult);

  console.log("\n--- HackerNews ---");
  const hnResult = await runSpecial(SPECIAL_SOURCES.hackernews.key, new HackerNewsConnector(), SPECIAL_SOURCES.hackernews.weight);
  printResult(hnResult);
  allResults.push(hnResult);

  const totalCount = await prisma.signal.count();
  const totalNew = allResults.reduce((s, r) => s + r.persisted, 0);
  const failed = allResults.filter((r) => !r.ok);

  console.log(`\n=== Summary ===`);
  console.log(`Total signals in DB: ${totalCount}`);
  console.log(`New this run: ${totalNew}`);
  console.log(`Sources with ≥1 candidate: ${allResults.filter((r) => r.ok).length}/${allResults.length}`);

  if (failed.length > 0) {
    console.log(`\nFailed sources (returned 0 candidates):`);
    failed.forEach((r) => console.log(`  - ${r.sourceKey}`));
    process.exit(1);
  }

  console.log("\nAll sources produced ≥1 candidate. ✓");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
