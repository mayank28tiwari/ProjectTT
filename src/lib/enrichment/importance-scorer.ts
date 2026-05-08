import { ImpactLabel, Importance } from "@prisma/client";

interface ScoreInput {
  impactLabel: ImpactLabel;
  sourceWeight: number;
  isMajorVersion: boolean;
}

export function scoreImportance({ impactLabel, sourceWeight, isMajorVersion }: ScoreInput): Importance {
  if (impactLabel === "BreakingChange" && sourceWeight >= 0.9) return "Critical";
  if (impactLabel === "SecurityFix") return "Severe";
  if (impactLabel === "BreakingChange") return "Severe";
  if (impactLabel === "NewCapability" && sourceWeight >= 0.9) return "Important";
  if (impactLabel === "CostChange") return "Important";
  if (isMajorVersion) return "Important";
  if (impactLabel === "Silent") return "Low";
  return "Normal";
}

export function isMajorVersionRelease(title: string): boolean {
  return /v?\d+\.0\.0\b/.test(title);
}
