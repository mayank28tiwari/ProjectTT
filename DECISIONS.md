# Decisions

## D1 — Phase 2 code left in place (2026-05-08)
The repo already has Phase 2+ features partially built (auth, personalization, saved signals, anticipated lane, LLM enrichment). Operator instructed to follow Phase 1 PRD strictly without deleting existing Phase 2 scaffolding. Phase 1 modules are built alongside existing code without extending or invoking Phase 2 paths.

## D2 — Schema replacement strategy (2026-05-08)
Current schema has 12 models including Phase 2 tables. PRD §4 specifies 4 models. Replacing schema as PRD specifies; Phase 2 model definitions are dropped from schema (they were non-functional without migrations anyway). Phase 2 pages that import Prisma models will have broken imports until Phase 2 properly rebuilds them — acceptable per operator "Phase 1 only" instruction.

## D3 — Extra installed deps left in place (2026-05-08)
`next-auth`, `@next-auth/prisma-adapter`, `framer-motion`, `@google/genai`, `nuqs`, `next-themes`, `date-fns`, `sonner`, `@tanstack/react-query` are installed but not in PRD §1. Removing them would break existing Phase 2 page scaffolding. Left as-is; Phase 1 ingestion code does not import them.

## D4 — `@google/genai` not removed (2026-05-08)
PRD §1 says do not add Gemini SDK. It is already present. `src/lib/enrichment/prompt.ts` uses it for LLM enrichment (Phase 2). The Phase 1 enrichment pipeline does not import this file. Left in place.
