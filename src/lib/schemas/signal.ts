// ─────────────────────────────────────────────────────
// Signal Schema — Canonical Signal type for TokenTalks
// Source of truth: prd.yaml → data_model.entities.Signal
// ─────────────────────────────────────────────────────

import { z } from "zod";
import {
    CategorySchema,
    ImpactLabelSchema,
    ImportanceSchema,
    SourceTypeSchema,
} from "@/lib/taxonomy";

// ── Citation Schema ──────────────────────────────────
export const CitationSchema = z.object({
    url: z.string().url(),
    title: z.string().optional(),
    snippet: z.string().optional(),
});

export type Citation = z.infer<typeof CitationSchema>;

// ── Signal Schema ────────────────────────────────────
export const SignalSchema = z.object({
    // Identity
    id: z.string().min(1),

    // Content — PRD-mandated fields
    title: z.string().min(1),
    summary: z.string().min(1),
    whyItMatters: z.string().min(1),
    whoShouldCare: z.string().min(1),

    // Classification
    category: CategorySchema,
    impactLabel: ImpactLabelSchema,
    impactConfidence: z.number().min(0).max(1).optional(),
    importance: ImportanceSchema,

    // Entities extracted from content
    entities: z.array(z.string()).default([]),

    // Source metadata
    sourceType: SourceTypeSchema,
    sourceName: z.string().min(1),
    sourceUrl: z.string().url(),

    // Timestamps
    publishedAt: z.string().datetime({ offset: true }).or(z.string().min(1)),
    fetchedAt: z.string().datetime({ offset: true }).or(z.string().min(1)),

    // Citations — at least one required per Signal Standard
    citations: z.array(CitationSchema).min(1),

    // Linkage to raw ingestion event
    rawEventId: z.string().nullable().optional(),

    // ── Client-side state (not persisted in DB) ──
    isSaved: z.boolean().optional(),
    isRead: z.boolean().optional(),
});

export type Signal = z.infer<typeof SignalSchema>;

// ── Validation helper for ingestion-time checks ─────
export function validateSignal(data: unknown): Signal {
    return SignalSchema.parse(data);
}
