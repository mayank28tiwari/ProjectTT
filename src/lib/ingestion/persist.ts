import { prisma } from "@/lib/db/prisma";
import { canonicalKey, payloadHash } from "./dedupe";
import type { RawCandidate } from "./types";
import type { EnrichedSignal } from "@/lib/enrichment/pipeline";

function generateSlug(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const suffix = id.slice(-6);
  return `${base}-${suffix}`;
}

export interface PersistResult {
  created: boolean;
  signalId: string;
}

export async function persistCandidate(
  candidate: RawCandidate,
  enriched: EnrichedSignal,
): Promise<PersistResult> {
  const hash = payloadHash(candidate.payload);
  const key = canonicalKey(candidate.sourceType, candidate.sourceUrl);

  // 1. Upsert RawEvent (idempotent by hash)
  const rawEvent = await prisma.rawEvent.upsert({
    where: { hash },
    update: {},
    create: {
      sourceType: candidate.sourceType,
      sourceKey: candidate.sourceKey,
      sourceUrl: candidate.sourceUrl,
      sourceId: candidate.sourceId,
      payload: candidate.payload as object,
      hash,
    },
  });

  // 2. Check if signal already exists
  const existing = await prisma.signal.findUnique({ where: { canonicalKey: key } });
  if (existing) {
    // On conflict: update sourceUrl + fetchedAt only
    await prisma.signal.update({
      where: { canonicalKey: key },
      data: { sourceUrl: candidate.sourceUrl, fetchedAt: new Date() },
    });
    return { created: false, signalId: existing.id };
  }

  // 3. Create new Signal
  const tempId = rawEvent.id;
  const slug = generateSlug(enriched.title, tempId);

  const signal = await prisma.signal.create({
    data: {
      slug,
      canonicalKey: key,
      title: enriched.title,
      mnemonicLabel: enriched.mnemonicLabel,
      quickHitSummary: enriched.quickHitSummary,
      summary: enriched.summary,
      whyItMatters: enriched.whyItMatters,
      whoShouldCare: enriched.whoShouldCare,
      category: enriched.category,
      impactLabel: enriched.impactLabel,
      impactConfidence: enriched.impactConfidence,
      importance: enriched.importance,
      entities: enriched.entities,
      sourceType: candidate.sourceType,
      sourceName: candidate.sourceName,
      sourceUrl: candidate.sourceUrl,
      publishedAt: candidate.publishedAt,
      rawEventId: rawEvent.id,
      status: "published",
    },
  });

  return { created: true, signalId: signal.id };
}

export async function updateFeedMeta(newSignalsCount: number): Promise<void> {
  await prisma.feedMeta.upsert({
    where: { id: 1 },
    update: {
      tokenStreamLastFlowedAt: new Date(),
      ingestionLastRunAt: new Date(),
      totalSignalsPublished: { increment: newSignalsCount },
    },
    create: { id: 1 },
  });
}
