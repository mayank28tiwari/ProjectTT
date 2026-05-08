import Link from "next/link";
import { notFound } from "next/navigation";
import type { Signal } from "@prisma/client";

interface SignalWithPayload extends Signal {
  rawEvent?: { payload: unknown; sourceUrl: string } | null;
}

async function fetchSignal(slug: string): Promise<SignalWithPayload | null> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/signals/${slug}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json() as Promise<SignalWithPayload>;
}

export default async function SignalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const signal = await fetchSignal(slug);
  if (!signal) notFound();

  const payloadPreview = signal.rawEvent?.payload
    ? JSON.stringify(signal.rawEvent.payload, null, 2).slice(0, 800)
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/feed" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6 inline-block">
        ← Back to feed
      </Link>

      <p className="text-xs text-zinc-500 font-mono mb-1">{signal.mnemonicLabel}</p>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">{signal.title}</h1>

      <div className="flex items-center gap-3 text-sm text-zinc-500 mb-6">
        <span>{signal.sourceName}</span>
        <span>·</span>
        <span>{signal.category}</span>
        <span>·</span>
        <span>{signal.impactLabel.replace(/_/g, " ")}</span>
        <span>·</span>
        <span>{new Date(signal.publishedAt).toLocaleDateString()}</span>
      </div>

      <p className="text-zinc-300 mb-6">{signal.summary}</p>

      <div className="space-y-3 mb-6 border border-zinc-800 rounded-lg p-4">
        <p className="text-sm"><span className="text-zinc-400 font-medium">Why it matters</span> → {signal.whyItMatters}</p>
        <p className="text-sm"><span className="text-zinc-400 font-medium">Who should care</span> → {signal.whoShouldCare}</p>
      </div>

      {signal.entities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {signal.entities.map((e) => (
            <span key={e} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{e}</span>
          ))}
        </div>
      )}

      <a
        href={signal.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors mb-8"
      >
        View original source ↗
      </a>

      {payloadPreview && (
        <div>
          <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wide">Source payload preview</p>
          <pre className="rounded-lg bg-zinc-900 border border-zinc-800 p-4 text-xs text-zinc-400 overflow-x-auto whitespace-pre-wrap break-words">
            {payloadPreview}
            {payloadPreview.length >= 800 ? "\n…" : ""}
          </pre>
        </div>
      )}
    </div>
  );
}
