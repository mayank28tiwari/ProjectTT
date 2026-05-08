# Phase 1 Audit — 2026-05-08

## Summary
- Modules done: none
- Modules partial: M1, M3, M4, M5, M7, M8
- Modules missing: M0, M2, M5.5, M6, M9, M10
- Estimated remaining work: 30–40 hours

## Repo Hygiene
- .gitignore status: **MISSING** — no .gitignore exists at repo root
- Tracked files that shouldn't be: `.next/` (hundreds of build artifacts), `.DS_Store` (root + src/ + src/app/ + src/components/ + src/lib/)
- Other issues:
  - `DECISIONS.md` missing
  - `package.json` scripts missing: `db:generate`, `db:migrate`, `db:deploy`, `db:studio`, `ingest:test`
  - `.env.example` has wrong vars (no Upstash, Inngest, SENTRY_DSN; has NEXTAUTH_* which is Phase 2)

## Dependencies
- Installed and matching PRD: `prisma@^5.22`, `zod@^4.3.6`, `next@16.1.4`, `typescript`
- Missing from PRD §1 (need to add):
  - `fast-xml-parser` (RSS parsing)
  - `@octokit/rest` (GitHub releases connector)
  - `@octokit/graphql` (GHSA connector)
  - `@upstash/redis` (cache + rate-limit)
  - `inngest` (scheduler)
  - `@sentry/nextjs` (errors)
  - `tsx` (devDep, for `ingest:test` script)
- Extra deps not in PRD §1 (flag — do not remove without operator go-ahead):
  - `next-auth@^4.24.13` + `@next-auth/prisma-adapter` — PRD §17 out-of-scope for Phase 1, but already wired into existing pages
  - `@google/genai@^1.44.0` — Gemini SDK, Phase 2 LLM enrichment only, PRD says DO NOT add
  - `framer-motion@^12.29.0` — PRD §12 says no Framer Motion in Phase 1
  - `nuqs`, `next-themes`, `date-fns`, `sonner`, `@tanstack/react-query` — not in PRD §1 but low risk, used by existing UI

## Module-by-Module

### M0 — Repo Cleanup + Env Spec
Status: **missing**
Evidence: no `.gitignore`, `.next/` tracked, `.DS_Store` tracked, no `DECISIONS.md`, scripts block missing, no `tsx` devDep
Gap: create `.gitignore`, `git rm -r --cached` for `.next/` and `.DS_Store`, add package.json scripts, add `tsx` devDep, update `.env.example` with PRD §3 vars

### M1 — Prisma Schema
Status: **partial**
Evidence: `prisma/schema.prisma` exists but is wrong
Gap (all of these differ from PRD §4):
- Missing `previewFeatures = ["postgresqlExtensions"]` and `extensions = [pgvector(map: "vector")]`
- Missing `directUrl = env("DATABASE_URL_UNPOOLED")`
- Missing all enums: `SourceType`, `Category`, `ImpactLabel`, `Importance`, `SignalStatus`
- Signal model has completely different fields (no `slug`, `canonicalKey`, `mnemonicLabel`, `quickHitSummary`, `status`; wrong field types for `category`/`impactLabel`/`importance` — currently String not enum)
- Missing `SourceHealth` model
- `FeedMeta` has wrong id type (currently `String @id @default("singleton")`, PRD needs `Int @id @default(1)`)
- Current schema has 12 models, PRD needs 4; the extra 8 (Account, Session, VerificationToken, User, SavedSignal, FollowTag, StackEntity, AnticipatedItem, TrackedAnticipated) are Phase 2+ models
- **RISK: replacing schema is a destructive migration.** ⚠️ See Risks below.

### M2 — Source Registries
Status: **missing**
Evidence: `src/lib/sources/` directory does not exist
Gap: create `github-repos.ts`, `rss-feeds.ts`, `special-sources.ts` per PRD §5

### M3 — Connectors
Status: **partial**
Evidence: partial connector code exists at wrong locations (`src/lib/api/signals/{github,hackernews,arxiv,osv}.ts` and `src/lib/ingestion/sources/{github,hackernews,arxiv,osv}.ts`) but:
- Wrong interface (doesn't implement `Connector` from PRD §6.1)
- Wrong source keys
- Missing: `RssConnector`, `GhsaConnector` entirely
- Missing: `src/lib/ingestion/types.ts`, `http.ts`, `filters.ts`
Gap: create all 6 connectors under `src/lib/ingestion/connectors/`, `types.ts`, `http.ts`, `filters.ts` from scratch per PRD §6

### M4 — Enrichment Pipeline
Status: **partial**
Evidence: `src/lib/enrichment/enricher.ts`, `rules.ts` exist; `prompt.ts` exists (Phase 2 Gemini LLM — do not use)
Gap:
- `impact-classifier.ts` — missing (regex-based, PRD §7.1)
- `importance-scorer.ts` — missing (PRD §7.2)
- `entity-extractor.ts` + `entities.ts` — missing (PRD §7.3)
- `labels.ts` — missing (PRD §7.4)
- `whyitmatters.ts` — missing (PRD §7.5 template-based)
- `pipeline.ts` — missing at correct path (PRD §7.6 entry point)
- `src/lib/env.ts` — missing (PRD §3)

### M5 — Dedupe + Persistence
Status: **partial**
Evidence: `src/lib/ingestion/pipeline.ts` exists but wrong structure
Gap:
- `src/lib/ingestion/dedupe.ts` — missing (`canonicalKey` + `payloadHash` per PRD §8)
- `src/lib/ingestion/persist.ts` — missing (`persistCandidate` per PRD §8)

### M5.5 — Source Health
Status: **missing**
Evidence: no `source-health.ts`, no `SourceHealth` model in schema
Gap: create `src/lib/ingestion/source-health.ts` per PRD §9 after M1 schema lands

### M6 — Inngest Functions
Status: **missing**
Evidence: no `src/inngest/` directory, `inngest` not installed
Gap: create `src/inngest/client.ts`, all 6 function files, `src/app/api/inngest/route.ts` per PRD §10

### M7 — API Routes
Status: **partial**
Evidence: `src/app/api/signals/route.ts` and `src/app/api/meta/route.ts` exist but wrong spec
Gap:
- `/api/signals`: wrong pagination (currently cursor by id, PRD wants `{ lt: cursor }` + `orderBy publishedAt+id`), missing Upstash caching (30s TTL), missing rate limiting (60 req/min), wrong response shape (PRD needs `{ data, nextCursor, feedMeta }`)
- `/api/signals/[slug]/route.ts` — missing
- `/api/meta/route.ts` — wrong shape (PRD needs `sourcesActive`, `sourcesDisabled` counts)
- `/api/health/route.ts` — missing
- `/api/inngest/route.ts` — missing (Inngest serve handler)

### M8 — UI
Status: **partial**
Evidence: `src/app/feed/page.tsx` exists, `src/app/page.tsx` exists, layout exists
Gap:
- `src/app/feed/page.tsx` — currently client component with React Query; PRD §12.2 requires server component that fetches server-side
- `src/app/signals/[slug]/page.tsx` — missing (PRD §12.3)
- `src/app/layout.tsx` — exists but not dark `bg-zinc-950` per PRD §12.4; has Framer Motion providers
- Signal card format doesn't match PRD §12.2 (card uses different fields: `mnemonicLabel`, `quickHitSummary` not in current schema)
- Many Phase 2+ pages exist: `anticipated/`, `personalize/`, `saved/`, `read/`, `download/`

### M9 — Sentry
Status: **missing**
Evidence: `@sentry/nextjs` not installed, no config files
Gap: install + configure per PRD §13

### M10 — Test Script + Validation
Status: **missing**
Evidence: `src/scripts/ingest-test.ts` does not exist, `ingest:test` script missing
Gap: create per PRD §14

## Risks I See

1. **Destructive schema migration (STOP — need operator decision):** The current schema has 12 models including all Phase 2+ user/auth/personalization tables. Replacing with the PRD §4 schema drops 8 models. If a database exists with data, this is destructive. Even without data, it removes code that existing pages depend on (feed page, auth pages, personalize page, etc.). **I need to ask: should I replace the schema as PRD specifies (breaking existing Phase 2 scaffolding), or should I merge PRD models into the existing schema?** PRD says replace — but the execution prompt says "stop and ask" when existing Phase 2 features are partially built.

2. **Phase 2+ features already built (STOP — need operator decision):** The following out-of-scope (PRD §17) features are partially implemented and wired together:
   - Auth (NextAuth): `src/lib/auth.ts`, `src/app/api/auth/`, auth middleware in `src/middleware.ts`
   - My Signals / Personalization: `src/app/api/my-signals/`, `src/lib/ranking/`, `src/app/personalize/`
   - Saved signals: `src/app/api/saved/`, `src/app/saved/`
   - Anticipated lane: `src/app/anticipated/`, `src/app/api/anticipated/`
   - File upload: `src/app/api/stack/upload/`, `src/lib/stack/`
   - Sharing: `src/app/api/share/`, `src/lib/share/`
   - LLM enrichment: `src/lib/enrichment/prompt.ts` (Gemini calls)
   **Should I leave these as-is and build Phase 1 alongside them, or delete them?**

3. **No DATABASE_URL locally:** Can't run `prisma migrate dev` without Neon credentials. Will need operator to provide them or confirm Neon DB is provisioned.

4. **`@google/genai` is installed:** PRD §1 says "DO NOT add: ... gemini-sdk". It's already present. `prompt.ts` uses it for LLM enrichment. Per Phase 1, this module must not be called during ingestion — it's fine to leave the file but the enrichment pipeline must NOT import it.

5. **`next-auth` is installed and wired:** PRD §1 says do not add it, but removing it would break all existing auth-dependent pages. Since those pages are Phase 2, the safest approach is leave `next-auth` installed (it doesn't conflict with Phase 1 ingestion) but don't extend it.

6. **`src/app/feed/page.tsx` needs to become a server component:** The PRD requires a server component that fetches data at render time. The current implementation is a full client-side SPA with React Query and tabs. Replacing it breaks the Phase 2 UI work already done. **Need operator decision on how aggressively to rewrite the feed page.**

## Proposed Execution Plan

1. **M0: Repo Cleanup + Env Spec** — add `.gitignore`, `git rm -r --cached .next .DS_Store`, update `.env.example`, add package.json scripts, add `tsx` and 6 missing deps — ~1h
2. **M1: Prisma Schema** — replace schema with PRD §4 version (requires operator sign-off on destroying Phase 2 model definitions), run migration — ~1h
3. **M2: Source Registries** — create 3 config files verbatim from PRD §5 — ~30min
4. **M3: Connectors + HTTP Wrapper** — create `types.ts`, `http.ts`, `filters.ts`, all 6 connector files — ~6h
5. **M4: Enrichment Pipeline** — create `env.ts`, 6 enrichment files + `entities.ts` — ~4h
6. **M5: Dedupe + Persistence** — create `dedupe.ts`, `persist.ts` — ~2h
7. **M5.5: Source Health** — create `source-health.ts` — ~1h
8. **M6: Inngest Functions** — create client + 6 function files + serve route — ~4h
9. **M7: API Routes** — rewrite signals route to PRD spec, add slug/health/meta routes — ~3h
10. **M8: UI** — rewrite feed page as server component, add slug detail page — ~3h
11. **M9: Sentry** — install + configure — ~1h
12. **M10: Test Script + Validation** — write ingest-test.ts, run full acceptance check — ~2h

Total: ~28–30h execution (plus setup/debugging buffer → 30–40h)
