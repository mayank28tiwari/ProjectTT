import { ImpactLabel } from "@prisma/client";

const MNEMONIC_BY_IMPACT: Record<ImpactLabel, string> = {
  BreakingChange:         "Breaking change:",
  SecurityFix:            "Security patch:",
  NewCapability:          "New capability:",
  CostChange:             "Pricing shift:",
  PerformanceImprovement: "Performance boost:",
  DeveloperExperience:    "DX update:",
  Deprecation:            "Deprecation:",
  Silent:                 "Update:",
};

export function generateMnemonicLabel(impact: ImpactLabel): string {
  return MNEMONIC_BY_IMPACT[impact];
}

export function generateQuickHitSummary(title: string): string {
  // Strip common prefixes, emojis, and bracketed tags
  let cleaned = title
    .replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+\s*/u, "")
    .replace(/^\[.*?\]\s*/, "")
    .replace(/^Release\s+v?[\d.]+\s*:\s*/i, "")
    .replace(/^v?[\d]+\.[\d]+\.[\d]+\s*:\s*/, "")
    .trim();

  // Truncate at word boundary to 120 chars
  if (cleaned.length > 120) {
    cleaned = cleaned.slice(0, 120).replace(/\s+\S*$/, "") + "…";
  }

  return cleaned.replace(/\n+/g, " ");
}
