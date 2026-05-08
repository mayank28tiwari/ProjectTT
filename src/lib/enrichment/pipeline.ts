import { Category, ImpactLabel } from "@prisma/client";
import { classifyImpact } from "./impact-classifier";
import { scoreImportance, isMajorVersionRelease } from "./importance-scorer";
import { extractEntities } from "./entity-extractor";
import { generateMnemonicLabel, generateQuickHitSummary } from "./labels";
import { generateWhyItMatters, generateWhoShouldCare } from "./whyitmatters";
import type { RawCandidate } from "@/lib/ingestion/types";

export interface EnrichedSignal {
  title: string;
  mnemonicLabel: string;
  quickHitSummary: string;
  summary: string;
  whyItMatters: string;
  whoShouldCare: string;
  category: Category;
  impactLabel: ImpactLabel;
  impactConfidence: number;
  importance: ReturnType<typeof scoreImportance>;
  entities: string[];
  sourceType: RawCandidate["sourceType"];
  sourceName: string;
  sourceUrl: string;
  publishedAt: Date;
}

export function enrich(candidate: RawCandidate, sourceWeight: number): EnrichedSignal {
  // 1. Classify impact
  const { label: impactLabel, confidence: impactConfidence } = classifyImpact(
    candidate.title,
    candidate.rawText,
  );

  // 2. Extract entities
  const entities = extractEntities(
    candidate.title + " " + candidate.rawText,
    candidate.metadata?.knownEntities,
  );

  // 3. Score importance
  const isMajor = isMajorVersionRelease(candidate.title);
  const importance = scoreImportance({ impactLabel, sourceWeight, isMajorVersion: isMajor });

  // 4. Generate mnemonic label
  const mnemonicLabel = generateMnemonicLabel(impactLabel);

  // 5. Generate quick-hit summary
  const quickHitSummary = generateQuickHitSummary(candidate.title);

  // 6. Generate why/who from templates
  const ctx = { entities, sourceName: candidate.sourceName };
  const whyItMatters = generateWhyItMatters(impactLabel, ctx);
  const whoShouldCare = generateWhoShouldCare(impactLabel, ctx);

  // 7. Assign category
  const suggestedCategory = candidate.metadata?.suggestedCategory;
  const category: Category =
    suggestedCategory && isValidCategory(suggestedCategory)
      ? (suggestedCategory as Category)
      : "Tools";

  // Use title as summary when rawText is short
  const summary = candidate.rawText.length > 20
    ? candidate.rawText.slice(0, 300)
    : candidate.title;

  // Override impact from connector metadata if confident
  const finalImpactLabel: ImpactLabel =
    candidate.metadata?.suggestedImpactLabel &&
    isValidImpactLabel(candidate.metadata.suggestedImpactLabel)
      ? (candidate.metadata.suggestedImpactLabel as ImpactLabel)
      : impactLabel;

  return {
    title: candidate.title,
    mnemonicLabel,
    quickHitSummary,
    summary,
    whyItMatters,
    whoShouldCare,
    category,
    impactLabel: finalImpactLabel,
    impactConfidence,
    importance,
    entities,
    sourceType: candidate.sourceType,
    sourceName: candidate.sourceName,
    sourceUrl: candidate.sourceUrl,
    publishedAt: candidate.publishedAt,
  };
}

const VALID_CATEGORIES = new Set<string>([
  "AI","DevOps","Cloud","Web","Backend","Data","Mobile","Security","OpenSource","Tools","Research",
]);

const VALID_IMPACT_LABELS = new Set<string>([
  "BreakingChange","NewCapability","SecurityFix","CostChange",
  "PerformanceImprovement","DeveloperExperience","Deprecation","Silent",
]);

function isValidCategory(s: string): boolean { return VALID_CATEGORIES.has(s); }
function isValidImpactLabel(s: string): boolean { return VALID_IMPACT_LABELS.has(s); }
