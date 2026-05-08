"use client";

import { useState } from "react";
import type { Signal } from "@prisma/client";
import { SignalCard } from "./SignalCard";

interface Props {
  initialCursor: string | null;
  category?: string;
  impact?: string;
  importance?: string;
}

export function LoadMore({ initialCursor, category, impact, importance }: Props) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [loading, setLoading] = useState(false);

  if (!cursor) return null;

  async function loadMore() {
    if (!cursor) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ cursor, limit: "30" });
      if (category) params.set("category", category);
      if (impact) params.set("impact", impact);
      if (importance) params.set("importance", importance);
      const res = await fetch(`/api/signals?${params}`);
      const data = await res.json() as { data: Signal[]; nextCursor: string | null };
      setSignals((prev) => [...prev, ...data.data]);
      setCursor(data.nextCursor);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {signals.map((s) => (
        <SignalCard key={s.id} signal={s} />
      ))}
      {cursor && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-md border border-zinc-700 px-6 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
