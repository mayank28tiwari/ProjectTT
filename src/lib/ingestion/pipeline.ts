// ─────────────────────────────────────────────────────
// M4 Ingestion Orchestrator
// Runs sources, deduplicates via RawEvent, enriches, and upserts Signals.
// ─────────────────────────────────────────────────────

import { prisma } from "@/lib/db/prisma";
import { enrichSignal } from "@/lib/enrichment/enricher";
import { CandidateSignal } from "@/lib/enrichment/rules";
import { validateSignal } from "@/lib/schemas/signal";
import crypto from "crypto";

export interface IngestionSource {
    name: string;
    fetchCandidates: () => Promise<CandidateSignal[]>;
}

function hashString(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
}

export async function runIngestion(source: IngestionSource) {
    console.log(`[Ingestion] Starting pipeline for source: ${source.name}`);
    const candidates = await source.fetchCandidates();

    let newSignalsCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const candidate of candidates) {
        try {
            // 1. RawEvent Dedupe Check
            // We hash the sourceUrl as the primary dedupe key for events
            const hash = hashString(`${candidate.sourceUrl}`);

            const existingRaw = await prisma.rawEvent.findUnique({
                where: { hash },
            });

            if (existingRaw) {
                skippedCount++;
                continue;
            }

            // 2. Store RawEvent for future replay/audit
            const rawEvent = await prisma.rawEvent.create({
                data: {
                    sourceType: source.name,
                    sourceUrl: candidate.sourceUrl,
                    payload: candidate.rawPayload,
                    hash,
                },
            });

            // 3. Enrich (Hybrid Rules + LLM)
            const enrichment = await enrichSignal(candidate);

            // 4. Construct Signal payload
            // Note: We use the publishedAt from the payload if it exists, otherwise fallback to now
            const publishedAt = candidate.rawPayload?.publishedAt
                ? new Date(candidate.rawPayload.publishedAt)
                : new Date();

            const signalData = {
                title: candidate.title,
                summary: enrichment.summary,
                whyItMatters: enrichment.whyItMatters,
                whoShouldCare: enrichment.whoShouldCare,
                category: enrichment.entities.includes("ai") ? "AI" : "Tools", // Extremely basic fallback category rules
                impactLabel: enrichment.impactLabel,
                impactConfidence: 0.9,
                importance: enrichment.importance,
                entities: enrichment.entities,
                sourceType: source.name,
                sourceName: source.name.toUpperCase(),
                sourceUrl: candidate.sourceUrl,
                publishedAt,
                rawEventId: rawEvent.id,
                citations: [{ url: candidate.sourceUrl, title: "Primary Source" }],
            };

            // 5. Validate against Official PRD SignalSchema
            // We do not want hallucinated or invalid shapes in the DB
            const validated = validateSignal(signalData as any);

            // 6. Upsert the final Signal (dedupe by sourceType + sourceUrl)
            await prisma.signal.upsert({
                where: {
                    sourceType_sourceUrl: {
                        sourceType: validated.sourceType,
                        sourceUrl: validated.sourceUrl,
                    },
                },
                update: {},
                create: {
                    ...validated,
                    // Next.js Prisma adapter handles Json fields cleanly for arrays at the client level
                    citations: validated.citations as any,
                },
            });

            newSignalsCount++;
        } catch (error) {
            console.error(`[Ingestion] Error processing candidate ${candidate.sourceUrl}:`, error);
            errorCount++;
        }
    }

    // Update FeedMeta
    await prisma.feedMeta.upsert({
        where: { id: "singleton" },
        update: { tokenStreamLastFlowedAt: new Date(), ingestionLastRunAt: new Date() },
        create: { id: "singleton", tokenStreamLastFlowedAt: new Date(), ingestionLastRunAt: new Date() },
    });

    console.log(`[Ingestion] Finished ${source.name}. New: ${newSignalsCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);

    return { newSignalsCount, skippedCount, errorCount };
}
