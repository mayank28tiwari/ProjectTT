import { Octokit } from "@octokit/rest";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import type { GITHUB_REPOS } from "@/lib/sources/github-repos";

type RepoEntry = (typeof GITHUB_REPOS)[number];

export class GithubReleasesConnector implements Connector {
  sourceKey: string;
  sourceType = "github_release" as const;

  private repo: RepoEntry;
  private octokit: Octokit;

  constructor(repo: RepoEntry, token: string) {
    this.repo = repo;
    this.sourceKey = `github:${repo.owner}/${repo.repo}`;
    this.octokit = new Octokit({ auth: token });
  }

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    try {
      const { data: releases } = await this.octokit.rest.repos.listReleases({
        owner: this.repo.owner,
        repo: this.repo.repo,
        per_page: 10,
      });

      for (const release of releases) {
        if (release.draft || release.prerelease) continue;

        const url = release.html_url;
        const title = `${this.repo.owner}/${this.repo.repo} ${release.tag_name}: ${release.name ?? release.tag_name}`;
        const rawText = (release.body ?? "").slice(0, 2000);
        const publishedAt = new Date(release.published_at ?? release.created_at);

        candidates.push({
          sourceType: "github_release",
          sourceKey: this.sourceKey,
          sourceName: "GitHub",
          sourceUrl: url,
          sourceId: String(release.id),
          title,
          rawText,
          publishedAt,
          payload: release,
          metadata: {
            suggestedCategory: this.repo.category,
            knownEntities: [this.repo.repo.toLowerCase()],
          },
        });
      }
    } catch (err) {
      errors.push({
        item: `${this.repo.owner}/${this.repo.repo}`,
        error: String(err),
      });
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }
}
