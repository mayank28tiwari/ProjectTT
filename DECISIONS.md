# Decisions

## D1 — Phase 2 code left in place (2026-05-08)
The repo already has Phase 2+ features partially built (auth, personalization, saved signals, anticipated lane, LLM enrichment). Operator instructed to follow Phase 1 PRD strictly without deleting existing Phase 2 scaffolding. Phase 1 modules are built alongside existing code without extending or invoking Phase 2 paths.

## D2 — Schema replacement strategy (2026-05-08)
Current schema has 12 models including Phase 2 tables. PRD §4 specifies 4 models. Replacing schema as PRD specifies; Phase 2 model definitions are dropped from schema (they were non-functional without migrations anyway). Phase 2 pages that import Prisma models will have broken imports until Phase 2 properly rebuilds them — acceptable per operator "Phase 1 only" instruction.

## D3 — Extra installed deps left in place (2026-05-08)
`next-auth`, `@next-auth/prisma-adapter`, `framer-motion`, `@google/genai`, `nuqs`, `next-themes`, `date-fns`, `sonner`, `@tanstack/react-query` are installed but not in PRD §1. Removing them would break existing Phase 2 page scaffolding. Left as-is; Phase 1 ingestion code does not import them.

## D5 — `prisma migrate dev` deferred (2026-05-08)
`prisma migrate dev --name phase1_init` requires `DATABASE_URL` (Neon) and `DATABASE_URL_UNPOOLED` to be set in `.env.local`. These credentials are not available in local dev. Schema is written and validated via `prisma generate`. Migration must be run by operator once Neon DB is provisioned: `npx prisma migrate dev --name phase1_init && npx prisma db seed`.

## D6 — Phase 2 files stubbed for build compatibility (2026-05-08)
Schema replacement (D2) broke imports in Phase 2 scaffolding that referenced removed Prisma models. Stubbed: `src/app/api/anticipated/`, `src/app/api/my-signals/`, `src/app/api/saved/`, `src/app/api/me/`, `src/app/api/stack/`, `src/app/api/follows/`, `src/app/api/jobs/run/`, `src/lib/ingestion/pipeline.ts`, `src/lib/ingestion/sources/*`, `src/lib/ranking/mySignals.ts`. All stubs return 501 or export nothing. Phase 2 re-implements them properly.

## D4 — `@google/genai` not removed (2026-05-08)
PRD §1 says do not add Gemini SDK. It is already present. `src/lib/enrichment/prompt.ts` uses it for LLM enrichment (Phase 2). The Phase 1 enrichment pipeline does not import this file. Left in place.
