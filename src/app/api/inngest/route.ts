import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { ingestRssFn } from "@/inngest/functions/ingest-rss";
import { ingestGithubReleasesFn } from "@/inngest/functions/ingest-github-releases";
import { ingestGhsaFn } from "@/inngest/functions/ingest-ghsa";
import { ingestOsvFn } from "@/inngest/functions/ingest-osv";
import { ingestArxivFn } from "@/inngest/functions/ingest-arxiv";
import { ingestHackerNewsFn } from "@/inngest/functions/ingest-hackernews";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    ingestRssFn,
    ingestGithubReleasesFn,
    ingestGhsaFn,
    ingestOsvFn,
    ingestArxivFn,
    ingestHackerNewsFn,
  ],
});
