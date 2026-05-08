import { ImpactLabel } from "@prisma/client";

interface ClassifyResult {
  label: ImpactLabel;
  confidence: number;
}

const RULES: { pattern: RegExp; label: ImpactLabel; confidence: number }[] = [
  { pattern: /\b(breaking change|breaking|removed|deprecated|incompatible|migration required|migrate to)\b/i, label: "BreakingChange", confidence: 0.85 },
  { pattern: /\b(CVE-\d{4}|security|vulnerability|patch.*security|advisory)\b/i, label: "SecurityFix", confidence: 0.95 },
  { pattern: /\b(deprecat\w+)\b/i, label: "Deprecation", confidence: 0.75 },
  { pattern: /\b(price|pricing|cost|free tier|paid plan|billing)\b/i, label: "CostChange", confidence: 0.7 },
  { pattern: /\b(faster|throughput|latency|optimization|\d+%\s*(faster|improvement))\b/i, label: "PerformanceImprovement", confidence: 0.7 },
  { pattern: /\b(introduce|launch|ship\w*|new|now available|support for|adds support)\b/i, label: "NewCapability", confidence: 0.65 },
  { pattern: /\b(developer experience|DX|ergonomics|easier|simpler|cleaner API)\b/i, label: "DeveloperExperience", confidence: 0.6 },
];

export function classifyImpact(title: string, rawText: string): ClassifyResult {
  const text = `${title} ${rawText}`;

  for (const rule of RULES) {
    if (rule.pattern.test(text)) {
      // SecurityFix overrides Deprecation if "breaking" is nearby
      if (rule.label === "Deprecation" && /breaking/i.test(text)) continue;
      return { label: rule.label, confidence: rule.confidence };
    }
  }

  return { label: "Silent", confidence: 0.4 };
}
