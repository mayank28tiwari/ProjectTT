import type { SourceType } from "@prisma/client";

export interface RawCandidate {
  sourceType: SourceType;
  sourceKey: string;
  sourceName: string;
  sourceUrl: string;
  sourceId?: string;
  title: string;
  rawText: string;
  publishedAt: Date;
  payload: unknown;
  metadata?: {
    suggestedCategory?: string;
    suggestedImpactLabel?: string;
    knownEntities?: string[];
  };
}

export interface ConnectorResult {
  sourceKey: string;
  candidates: RawCandidate[];
  errors: { item: string; error: string }[];
}

export interface Connector {
  sourceKey: string;
  sourceType: SourceType;
  fetch(): Promise<ConnectorResult>;
}
