# Deployment Guide — Phase 1

## Prerequisites

- Neon Postgres project created (free tier OK). Copy `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct).
- Upstash Redis database created. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- GitHub Personal Access Token with `read:packages`, `security_events` scopes.
- Inngest account at app.inngest.com. Copy `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` from your app settings.
- Sentry project for Next.js. Copy DSN.
- Vercel account.

## Steps

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Connect Vercel

1. Go to vercel.com → New Project → Import from GitHub.
2. Select this repo. Build settings are auto-detected for Next.js.
3. Add all environment variables from `.env.example`:

| Variable | Where to find |
|---|---|
| `DATABASE_URL` | Neon dashboard → Connection string (pooled) |
| `DATABASE_URL_UNPOOLED` | Neon dashboard → Connection string (direct/unpooled) |
| `UPSTASH_REDIS_REST_URL` | Upstash console → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash console → REST API |
| `INNGEST_EVENT_KEY` | Inngest dashboard → App → Event keys |
| `INNGEST_SIGNING_KEY` | Inngest dashboard → App → Signing key |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → PAT |
| `SENTRY_DSN` | Sentry → Project → Settings → Client Keys |
| `SENTRY_ENVIRONMENT` | Set to `production` |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL, e.g. `https://tokentalks.vercel.app` |

### 3. Run DB migration

After deploying, open Vercel → Functions → Terminal (or run locally with production env):

```bash
npx prisma migrate deploy
```

This creates all 4 tables. Verify with:

```bash
npx prisma studio
```

FeedMeta row id=1 is created automatically by `prisma/seed.ts` (run `npx prisma db seed` once).

### 4. Deploy

Click **Deploy** in Vercel. Build should succeed in ~2 minutes.

Verify: visit `https://{your-domain}/api/health` — returns `[]` (no sources yet).

### 5. Register Inngest app

1. Go to app.inngest.com → Apps → Add app.
2. Enter your app URL: `https://{your-domain}/api/inngest`.
3. Inngest will sync and show 6 functions.

### 6. First ingest run

In Inngest dashboard:
1. Click `ingest-rss` → **Invoke**.
2. Wait ~1–2 minutes.
3. Visit `https://{your-domain}/feed` — signals should appear.
4. Check `GET /api/health` — should show rows with `lastSuccessAt` set.

Repeat for the other 5 functions, or wait for their scheduled crons.

### 7. Verify

```bash
curl https://{your-domain}/api/signals | jq '.data | length'
# Should be 30

curl https://{your-domain}/api/meta | jq '.'
# tokenStreamLastFlowedAt should be set
```

### 8. Custom domain (optional)

Add your custom domain in Vercel → Settings → Domains. Update `NEXT_PUBLIC_APP_URL` env var to match.

## Scheduled cron reference

| Function | Schedule | Description |
|---|---|---|
| ingest-rss | `15 * * * *` | Every hour at :15 |
| ingest-github-releases | `5 * * * *` | Every hour at :05 |
| ingest-ghsa | `25 * * * *` | Every hour at :25 |
| ingest-osv | `35 * * * *` | Every hour at :35 |
| ingest-arxiv | `45 */3 * * *` | Every 3 hours at :45 |
| ingest-hackernews | `55 * * * *` | Every hour at :55 |
