# Phase 1 Verification

## Static checks (no DB required)

| Check | Status |
|---|---|
| `npm run build` passes 0 errors | ✓ |
| `npm run lint` passes 0 errors | ✓ |
| `prisma validate` (schema) | ✓ |
| All 6 Inngest functions registered in `/api/inngest` | ✓ |

## Acceptance criteria (require live DB + credentials)

Run `npm run ingest:test` after setting `.env` from `.env.example`.

| # | Criterion | How to verify |
|---|---|---|
| 1 | Build + lint pass 0 errors | `npm run build && npm run lint` |
| 2 | DB migrations run cleanly | `npx prisma migrate deploy` |
| 3 | ≥50 signals in DB after first ingest | `npm run ingest:test` — check summary line |
| 4 | Idempotency: second run adds 0 new | Run `npm run ingest:test` twice |
| 5 | SourceHealth has row per source | `GET /api/health` returns populated array |
| 6 | Endpoints respond correctly | See table below |
| 7 | Feed page shows ≥30 cards | Visit `/feed` |
| 8 | Inngest functions appear in dashboard | Register app at Inngest dashboard |
| 9 | Sentry captures exceptions | Throw test error, check Sentry UI |
| 10 | Clean repo | `git status` — only untracked `.next/` files |

## Endpoint smoke tests

```bash
# Signals list
curl /api/signals | jq '.data | length'
# Should be 30

# Category filter
curl "/api/signals?category=AI" | jq '.data[0].category'
# Should be "AI"

# Single signal
curl "/api/signals/<slug>" | jq '.title'

# Meta
curl /api/meta | jq '{tokenStreamLastFlowedAt, totalPublished, sourcesActive}'

# Health
curl /api/health | jq 'length'

# Inngest manifest
curl /api/inngest | jq '.functions | length'
# Should be 6
```

## Module completion log

| Module | Commit | Description |
|---|---|---|
| M0 | `feb90ae8` | Initial project scaffold |
| M1 | Part of initial commits | Prisma schema (4 models, 5 enums, pgvector) |
| M2 | Part of initial commits | Source lists (30 GitHub repos, 10 RSS, 4 special) |
| M3 | Part of initial commits | Ingestion types, http, filters |
| M4 | Part of initial commits | Connectors (RSS, GitHub, GHSA, OSV, arXiv, HN) |
| M5 | Part of initial commits | Enrichment pipeline (7 steps) |
| M5.5 | Part of initial commits | Source health tracking |
| M6 | `26dc85ed` | Inngest scheduler functions (6 sources) |
| M7 | `6e42007c` | API routes with cursor pagination, Redis cache, rate limiting |
| M8 | `7740d1e3` | Minimal functional UI |
| M9 | `82529ecc` | Sentry integration |
| M10 | current | Ingest test script + verification doc |
