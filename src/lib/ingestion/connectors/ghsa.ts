import { graphql } from "@octokit/graphql";
import type { Connector, ConnectorResult, RawCandidate } from "../types";
import { SPECIAL_SOURCES } from "@/lib/sources/special-sources";

const GHSA_QUERY = `
  query {
    securityAdvisories(first: 30, orderBy: { field: PUBLISHED_AT, direction: DESC }) {
      nodes {
        ghsaId summary description severity publishedAt updatedAt
        vulnerabilities(first: 5) {
          nodes {
            package { name ecosystem }
            vulnerableVersionRange
            firstPatchedVersion { identifier }
          }
        }
        references { url }
      }
    }
  }
`;

interface GhsaNode {
  ghsaId: string;
  summary: string;
  description: string;
  severity: string;
  publishedAt: string;
  updatedAt: string;
  vulnerabilities: {
    nodes: {
      package: { name: string; ecosystem: string };
      vulnerableVersionRange: string;
      firstPatchedVersion: { identifier: string } | null;
    }[];
  };
  references: { url: string }[];
}

export class GhsaConnector implements Connector {
  sourceKey = SPECIAL_SOURCES.ghsa.key;
  sourceType = "github_advisory" as const;

  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async fetch(): Promise<ConnectorResult> {
    const errors: ConnectorResult["errors"] = [];
    const candidates: RawCandidate[] = [];

    try {
      const result = await graphql<{
        securityAdvisories: { nodes: GhsaNode[] };
      }>(GHSA_QUERY, {
        headers: { authorization: `token ${this.token}` },
      });

      for (const node of result.securityAdvisories.nodes) {
        const firstPkg = node.vulnerabilities.nodes[0]?.package;
        const title = `[${node.severity}] ${node.ghsaId}: ${node.summary}`;
        const rawText = node.description.slice(0, 2000);
        const url = node.references[0]?.url ?? `https://github.com/advisories/${node.ghsaId}`;

        candidates.push({
          sourceType: "github_advisory",
          sourceKey: this.sourceKey,
          sourceName: SPECIAL_SOURCES.ghsa.name,
          sourceUrl: url,
          sourceId: node.ghsaId,
          title,
          rawText,
          publishedAt: new Date(node.publishedAt),
          payload: node,
          metadata: {
            suggestedCategory: "Security",
            suggestedImpactLabel: "SecurityFix",
            knownEntities: firstPkg ? [firstPkg.name.toLowerCase()] : [],
          },
        });
      }
    } catch (err) {
      errors.push({ item: "ghsa", error: String(err) });
    }

    return { sourceKey: this.sourceKey, candidates, errors };
  }
}
