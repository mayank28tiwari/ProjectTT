import { Signal } from "@/types/signal";

/**
 * M9 Sharing Module
 * Generates an optimized Twitter Web Intent URL for a given Signal.
 * Formula: [Title] — [Why it matters snippet]
 * [Category] #TokenTalks [SignalLink]
 */
export function generateTweetIntent(signal: Signal, appUrl: string): string {
    // Truncate why it matters if it's too long
    let snippet = signal.whyItMatters;
    if (snippet.length > 100) {
        snippet = snippet.substring(0, 97) + "...";
    }

    // Use the canonical source URL or a direct link to the app's signal page if built
    // For MVP, if we don't have dynamic signal pages, we share the primary source.
    const linkToShare = `${appUrl}/item/${signal.id}`;

    const text = `${signal.title}\n\n💡 ${snippet}\n\nVia ${signal.sourceName}\n#${signal.category} #TokenTalks\n`;

    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", text);
    url.searchParams.set("url", linkToShare);

    return url.toString();
}
