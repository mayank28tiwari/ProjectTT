import Link from "next/link";
import type { Signal } from "@prisma/client";
import { SignalCard } from "@/components/feed2/SignalCard";
import { LoadMore } from "@/components/feed2/LoadMore";

interface FeedResponse {
  data: Signal[];
  nextCursor: string | null;
  feedMeta: { tokenStreamLastFlowedAt: string | null; totalPublished: number };
}

const CATEGORIES = ["All", "AI", "Web", "Backend", "Cloud", "Security"];

async function fetchSignals(params: URLSearchParams): Promise<FeedResponse> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/signals?${params}`, { next: { revalidate: 30 } });
  if (!res.ok) return { data: [], nextCursor: null, feedMeta: { tokenStreamLastFlowedAt: null, totalPublished: 0 } };
  return res.json() as Promise<FeedResponse>;
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; impact?: string; importance?: string }>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams({ limit: "30" });
  if (sp.category && sp.category !== "All") params.set("category", sp.category);
  if (sp.impact) params.set("impact", sp.impact);
  if (sp.importance) params.set("importance", sp.importance);

  const { data, nextCursor, feedMeta } = await fetchSignals(params);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-100">Token Stream</h1>
        {feedMeta.tokenStreamLastFlowedAt && (
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            Last signal {new Date(feedMeta.tokenStreamLastFlowedAt).toLocaleString()}
          </span>
        )}
      </div>

      <nav className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => {
          const active = (sp.category ?? "All") === cat;
          const href = cat === "All" ? "/feed" : `/feed?category=${cat}`;
          return (
            <Link
              key={cat}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </nav>

      {data.length === 0 ? (
        <p className="text-zinc-500 text-center py-16">No signals yet. Ingestion runs every hour.</p>
      ) : (
        <div className="space-y-4">
          {data.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
          <LoadMore
            initialCursor={nextCursor}
            category={sp.category !== "All" ? sp.category : undefined}
            impact={sp.impact}
            importance={sp.importance}
          />
        </div>
      )}
    </div>
  );
}
