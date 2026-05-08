import { prisma } from "@/lib/db/prisma";
import type { SourceType } from "@prisma/client";

const AUTO_DISABLE_THRESHOLD = 5;

export async function recordSuccess(
  sourceKey: string,
  sourceType: SourceType,
  signalsProduced: number,
): Promise<void> {
  await prisma.sourceHealth.upsert({
    where: { sourceKey },
    update: {
      lastSuccessAt: new Date(),
      consecutiveFailures: 0,
      totalFetches: { increment: 1 },
      totalSignalsProduced: { increment: signalsProduced },
    },
    create: {
      sourceKey,
      sourceType,
      lastSuccessAt: new Date(),
      consecutiveFailures: 0,
      totalFetches: 1,
      totalSignalsProduced: signalsProduced,
    },
  });
}

export async function recordFailure(
  sourceKey: string,
  sourceType: SourceType,
  error: Error,
): Promise<void> {
  const existing = await prisma.sourceHealth.findUnique({ where: { sourceKey } });
  const failures = (existing?.consecutiveFailures ?? 0) + 1;
  const shouldDisable = failures >= AUTO_DISABLE_THRESHOLD;

  await prisma.sourceHealth.upsert({
    where: { sourceKey },
    update: {
      lastErrorAt: new Date(),
      lastError: error.message.slice(0, 500),
      consecutiveFailures: failures,
      totalFetches: { increment: 1 },
      ...(shouldDisable && { enabled: false }),
    },
    create: {
      sourceKey,
      sourceType,
      lastErrorAt: new Date(),
      lastError: error.message.slice(0, 500),
      consecutiveFailures: 1,
      totalFetches: 1,
      enabled: true,
    },
  });
}

export async function isSourceEnabled(sourceKey: string): Promise<boolean> {
  const health = await prisma.sourceHealth.findUnique({ where: { sourceKey } });
  return health?.enabled ?? true;
}
