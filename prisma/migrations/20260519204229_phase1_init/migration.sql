-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('github_release', 'github_advisory', 'rss', 'arxiv', 'hackernews', 'osv');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('AI', 'DevOps', 'Cloud', 'Web', 'Backend', 'Data', 'Mobile', 'Security', 'OpenSource', 'Tools', 'Research');

-- CreateEnum
CREATE TYPE "ImpactLabel" AS ENUM ('BreakingChange', 'NewCapability', 'SecurityFix', 'CostChange', 'PerformanceImprovement', 'DeveloperExperience', 'Deprecation', 'Silent');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('Critical', 'Severe', 'Important', 'Normal', 'Low');

-- CreateEnum
CREATE TYPE "SignalStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "RawEvent" (
    "id" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceId" TEXT,
    "payload" JSONB NOT NULL,
    "hash" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signal" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mnemonicLabel" TEXT NOT NULL,
    "quickHitSummary" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "whyItMatters" TEXT NOT NULL,
    "whoShouldCare" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "impactLabel" "ImpactLabel" NOT NULL,
    "impactConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "importance" "Importance" NOT NULL,
    "entities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sourceType" "SourceType" NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawEventId" TEXT,
    "status" "SignalStatus" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canonicalKey" TEXT NOT NULL,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceHealth" (
    "id" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastSuccessAt" TIMESTAMP(3),
    "lastErrorAt" TIMESTAMP(3),
    "lastError" TEXT,
    "consecutiveFailures" INTEGER NOT NULL DEFAULT 0,
    "totalFetches" INTEGER NOT NULL DEFAULT 0,
    "totalSignalsProduced" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedMeta" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "tokenStreamLastFlowedAt" TIMESTAMP(3),
    "ingestionLastRunAt" TIMESTAMP(3),
    "totalSignalsPublished" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RawEvent_hash_key" ON "RawEvent"("hash");

-- CreateIndex
CREATE INDEX "RawEvent_sourceType_fetchedAt_idx" ON "RawEvent"("sourceType", "fetchedAt");

-- CreateIndex
CREATE INDEX "RawEvent_sourceKey_fetchedAt_idx" ON "RawEvent"("sourceKey", "fetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Signal_slug_key" ON "Signal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Signal_canonicalKey_key" ON "Signal"("canonicalKey");

-- CreateIndex
CREATE INDEX "Signal_status_publishedAt_idx" ON "Signal"("status", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Signal_category_publishedAt_idx" ON "Signal"("category", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Signal_impactLabel_publishedAt_idx" ON "Signal"("impactLabel", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Signal_importance_publishedAt_idx" ON "Signal"("importance", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Signal_entities_idx" ON "Signal" USING GIN ("entities");

-- CreateIndex
CREATE UNIQUE INDEX "SourceHealth_sourceKey_key" ON "SourceHealth"("sourceKey");

-- CreateIndex
CREATE INDEX "SourceHealth_enabled_idx" ON "SourceHealth"("enabled");

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_rawEventId_fkey" FOREIGN KEY ("rawEventId") REFERENCES "RawEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
