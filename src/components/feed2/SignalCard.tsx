import type { Signal } from "@prisma/client";
import Link from "next/link";

const importanceDot: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-400",
  medium: "bg-yellow-400",
  low: "bg-zinc-500",
};

const impactBadge: Record<string, string> = {
  breaking_change: "bg-red-900 text-red-300",
  security_fix: "bg-orange-900 text-orange-300",
  major_feature: "bg-blue-900 text-blue-300",
  minor_improvement: "bg-zinc-800 text-zinc-400",
  deprecation: "bg-yellow-900 text-yellow-300",
  research: "bg-purple-900 text-purple-300",
  vulnerability: "bg-red-900 text-red-300",
  other: "bg-zinc-800 text-zinc-400",
};

function timeAgo(date: Date | string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function SignalCard({ signal }: { signal: Signal }) {
  const dot = importanceDot[signal.importance] ?? "bg-zinc-500";
  const badge = impactBadge[signal.impactLabel] ?? "bg-zinc-800 text-zinc-400";
  const host = (() => { try { return new URL(signal.sourceUrl).hostname; } catch { return signal.sourceUrl; } })();

  return (
    <article className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors">
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
        <span className={`rounded px-1.5 py-0.5 font-medium ${badge}`}>
          {signal.impactLabel.replace(/_/g, " ")}
        </span>
        <span className="ml-auto">{signal.sourceName} · {timeAgo(signal.publishedAt)}</span>
      </div>
      <Link href={`/signals/${signal.slug}`} className="hover:text-zinc-300 transition-colors">
        <p className="text-xs text-zinc-500 font-mono mb-0.5">{signal.mnemonicLabel}</p>
        <h3 className="font-semibold text-zinc-100 mb-1">{signal.title}</h3>
      </Link>
      <p className="text-sm text-zinc-400 mb-3">{signal.quickHitSummary}</p>
      <div className="text-sm text-zinc-500 space-y-1">
        <p><span className="text-zinc-400">Why it matters</span> → {signal.whyItMatters}</p>
        <p><span className="text-zinc-400">Who should care</span> → {signal.whoShouldCare}</p>
      </div>
      <a
        href={signal.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        View source ↗ {host}
      </a>
    </article>
  );
}
