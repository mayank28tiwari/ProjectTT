import Link from "next/link";

async function getLastFlowed(): Promise<string | null> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/meta`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const data = await res.json() as { tokenStreamLastFlowedAt?: string | null };
    return data.tokenStreamLastFlowedAt ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const lastFlowed = await getLastFlowed();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
        TokenTalks — Know before it breaks.
      </h1>
      <p className="text-zinc-400 max-w-xl text-lg">
        Developer signal intelligence: releases, security advisories, and research papers — ingested, enriched, and surfaced in one feed.
      </p>
      {lastFlowed && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Last signal {new Date(lastFlowed).toLocaleString()}
        </div>
      )}
      <Link
        href="/feed"
        className="mt-2 inline-block rounded-md bg-zinc-100 text-zinc-950 px-6 py-2.5 text-sm font-semibold hover:bg-white transition-colors"
      >
        Open Token Stream →
      </Link>
    </div>
  );
}
