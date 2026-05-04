// ─────────────────────────────────────────────────────
// AnticipatedItem Schema — Canonical type for TokenTalks
// Source of truth: prd.yaml → data_model.entities.AnticipatedItem
// ─────────────────────────────────────────────────────

import { z } from "zod";
import { AnticipatedStatusSchema, ConfidenceSchema } from "@/lib/taxonomy";

// ── Evidence Link Schema ─────────────────────────────
export const EvidenceLinkSchema = z.object({
    url: z.string().url(),
    type: z.string().min(1), // e.g. "Official teaser/roadmap", "GitHub issue/PR/RFC"
    title: z.string().optional(),
});

export type EvidenceLink = z.infer<typeof EvidenceLinkSchema>;

// ── AnticipatedItem Schema ───────────────────────────
export const AnticipatedItemSchema = z.object({
    // Identity
    id: z.string().min(1),

    // Content
    title: z.string().min(1),
    whyItMatters: z.string().min(1),
    whoShouldCare: z.string().min(1),

    // Classification
    status: AnticipatedStatusSchema, // "statusBadge" in PRD required_fields
    confidence: ConfidenceSchema,

    // Evidence — at least one link required
    evidenceLinks: z.array(EvidenceLinkSchema).min(1),

    // Entities extracted from content
    entities: z.array(z.string()).default([]),

    // Timestamps
    firstSeenAt: z.string().datetime({ offset: true }).or(z.string().min(1)),
    lastCheckedAt: z.string().datetime({ offset: true }).or(z.string().min(1)),

    // Promotion linkage
    promotedSignalId: z.string().nullable().optional(),
});

export type AnticipatedItem = z.infer<typeof AnticipatedItemSchema>;

// ── Validation helper for ingestion-time checks ─────
export function validateAnticipatedItem(data: unknown): AnticipatedItem {
    return AnticipatedItemSchema.parse(data);
}
