// ─────────────────────────────────────────────────────
// src/types/signal.ts — Re-export hub
// All canonical types now live in @/lib/schemas/* and @/lib/taxonomy.
// This file re-exports everything so existing imports remain stable.
// ─────────────────────────────────────────────────────

// ── Schema types ─────────────────────────────────────
export { type Signal, type Citation, SignalSchema, CitationSchema, validateSignal } from "@/lib/schemas/signal";
export { type AnticipatedItem, type EvidenceLink, AnticipatedItemSchema, EvidenceLinkSchema, validateAnticipatedItem } from "@/lib/schemas/anticipated";

// ── Taxonomy enums + display configs ─────────────────
export {
    // Impact Labels
    IMPACT_LABELS,
    ImpactLabelSchema,
    type ImpactLabel,
    IMPACT_LABEL_CONFIG,

    // Importance
    IMPORTANCE_LEVELS,
    ImportanceSchema,
    type Importance,

    // Categories
    CATEGORIES,
    CategorySchema,
    type Category,
    CATEGORY_CONFIG,

    // Source Types
    SOURCE_TYPES,
    SourceTypeSchema,
    type SourceType,
    SOURCE_TYPE_CONFIG,

    // Anticipated Statuses
    ANTICIPATED_STATUSES,
    AnticipatedStatusSchema,
    type AnticipatedStatus,

    // Confidence
    CONFIDENCE_LEVELS,
    ConfidenceSchema,
    type Confidence,
} from "@/lib/taxonomy";
