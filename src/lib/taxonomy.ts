// ─────────────────────────────────────────────────────
// taxonomy.ts — Canonical enums & display config for TokenTalks
// Source of truth: prd.yaml → signal_standard
// ─────────────────────────────────────────────────────

import { z } from "zod";

// ── Impact Labels ────────────────────────────────────
export const IMPACT_LABELS = [
  "BreakingChange",
  "NewCapability",
  "SecurityFix",
  "CostChange",
  "PerformanceImprovement",
  "Silent",
] as const;

export const ImpactLabelSchema = z.enum(IMPACT_LABELS);
export type ImpactLabel = z.infer<typeof ImpactLabelSchema>;

export const IMPACT_LABEL_CONFIG: Record<ImpactLabel, { label: string; color: string; bgColor: string }> = {
  BreakingChange: {
    label: "Breaking Change",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
  NewCapability: {
    label: "New Capability",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
  },
  SecurityFix: {
    label: "Security Fix",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
  },
  CostChange: {
    label: "Cost Change",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
  PerformanceImprovement: {
    label: "Performance",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  Silent: {
    label: "Silent",
    color: "text-zinc-600 dark:text-zinc-400",
    bgColor: "bg-zinc-500/10 border-zinc-500/20",
  },
};

// ── Importance Levels ────────────────────────────────
export const IMPORTANCE_LEVELS = [
  "Critical",
  "Severe",
  "Important",
  "Normal",
  "Low",
] as const;

export const ImportanceSchema = z.enum(IMPORTANCE_LEVELS);
export type Importance = z.infer<typeof ImportanceSchema>;

// ── Categories ───────────────────────────────────────
export const CATEGORIES = [
  "AI",
  "DevOps",
  "Cloud",
  "Web",
  "Backend",
  "Data",
  "Mobile",
  "Security",
  "OpenSource",
  "Tools",
] as const;

export const CategorySchema = z.enum(CATEGORIES);
export type Category = z.infer<typeof CategorySchema>;

export const CATEGORY_CONFIG: Record<Category, { label: string; color: string }> = {
  AI:         { label: "AI",          color: "text-violet-500" },
  DevOps:     { label: "DevOps",      color: "text-teal-500" },
  Cloud:      { label: "Cloud",       color: "text-sky-500" },
  Web:        { label: "Web",         color: "text-orange-500" },
  Backend:    { label: "Backend",     color: "text-indigo-500" },
  Data:       { label: "Data",        color: "text-emerald-500" },
  Mobile:     { label: "Mobile",      color: "text-pink-500" },
  Security:   { label: "Security",    color: "text-red-500" },
  OpenSource: { label: "Open Source", color: "text-green-500" },
  Tools:      { label: "Tools",       color: "text-amber-500" },
};

// ── Source Types ─────────────────────────────────────
export const SOURCE_TYPES = [
  "github",
  "cloud",
  "osv",
  "arxiv",
  "hn",
  "vendor",
  "other",
] as const;

export const SourceTypeSchema = z.enum(SOURCE_TYPES);
export type SourceType = z.infer<typeof SourceTypeSchema>;

export const SOURCE_TYPE_CONFIG: Record<SourceType, { label: string; icon: string }> = {
  github: { label: "GitHub",       icon: "/icons/github.svg" },
  cloud:  { label: "Cloud",        icon: "/icons/cloud.svg" },
  osv:    { label: "OSV",          icon: "/icons/osv.svg" },
  arxiv:  { label: "arXiv",        icon: "/icons/arxiv.svg" },
  hn:     { label: "Hacker News",  icon: "/icons/hn.svg" },
  vendor: { label: "Vendor",       icon: "/icons/vendor.svg" },
  other:  { label: "Other",        icon: "/icons/other.svg" },
};

// ── Anticipated Statuses ─────────────────────────────
export const ANTICIPATED_STATUSES = ["Rumour", "Anticipated", "Unconfirmed"] as const;
export const AnticipatedStatusSchema = z.enum(ANTICIPATED_STATUSES);
export type AnticipatedStatus = z.infer<typeof AnticipatedStatusSchema>;

// ── Confidence Levels ────────────────────────────────
export const CONFIDENCE_LEVELS = ["Low", "Medium", "High"] as const;
export const ConfidenceSchema = z.enum(CONFIDENCE_LEVELS);
export type Confidence = z.infer<typeof ConfidenceSchema>;
