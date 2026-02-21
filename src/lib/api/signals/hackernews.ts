// Hacker News Algolia API Adapter
// Fetches tech-relevant stories using the Algolia HN Search API

import { Signal, SignalType, Domain } from '@/types/signal';

interface HNHit {
    objectID: string;
    title: string;
    url: string | null;
    author: string;
    points: number;
    num_comments: number;
    created_at: string;
    story_text?: string;
}

interface HNSearchResponse {
    hits: HNHit[];
    nbHits: number;
    page: number;
    nbPages: number;
}

// Domain detection based on keywords in title
function detectDomains(title: string): Domain[] {
    const lower = title.toLowerCase();
    const domains: Domain[] = [];

    // AI/ML keywords
    if (/\b(ai|gpt|llm|openai|anthropic|claude|gemini|transformer|neural|machine learning|ml|deep learning)\b/.test(lower)) {
        domains.push('ai');
    }

    // Web keywords
    if (/\b(react|vue|svelte|next\.?js|nuxt|astro|tailwind|css|html|javascript|typescript|frontend|web)\b/.test(lower)) {
        domains.push('web');
    }

    // DevOps keywords
    if (/\b(docker|kubernetes|k8s|ci\/cd|terraform|ansible|helm|devops|infrastructure|deploy)\b/.test(lower)) {
        domains.push('devops');
    }

    // Security keywords
    if (/\b(security|cve|vulnerability|exploit|breach|hack|ransomware|malware|zero.?day)\b/.test(lower)) {
        domains.push('security');
    }

    // Cloud keywords
    if (/\b(aws|gcp|azure|cloud|serverless|lambda|s3|cloudflare)\b/.test(lower)) {
        domains.push('cloud');
    }

    // Data keywords
    if (/\b(database|sql|postgres|mysql|mongodb|redis|kafka|spark|data|analytics|bigquery)\b/.test(lower)) {
        domains.push('data');
    }

    // Mobile keywords
    if (/\b(ios|android|swift|kotlin|flutter|react.?native|mobile|app store)\b/.test(lower)) {
        domains.push('mobile');
    }

    // Default to web if no domain detected (most HN content is web-related)
    return domains.length > 0 ? domains : ['web'];
}

// Detect signal type from title
function detectSignalType(title: string): SignalType {
    const lower = title.toLowerCase();

    if (/\b(security|cve|vulnerability|breach|exploit)\b/.test(lower)) {
        return 'security_fix';
    }
    if (/\b(breaking|deprecat|removed|sunset)\b/.test(lower)) {
        return 'breaking_change';
    }
    if (/\b(faster|performance|optimiz|speed|benchmark)\b/.test(lower)) {
        return 'performance';
    }
    if (/\b(paper|research|study|arxiv|findings)\b/.test(lower)) {
        return 'research';
    }
    if (/\b(pricing|cost|free|tier|billing)\b/.test(lower)) {
        return 'cost_change';
    }
    return 'new_capability';
}

// Search HN for tech-relevant content
async function searchHN(query: string, tags: string = 'story'): Promise<Signal[]> {
    try {
        const url = new URL('https://hn.algolia.com/api/v1/search');
        url.searchParams.set('query', query);
        url.searchParams.set('tags', tags);
        url.searchParams.set('hitsPerPage', '10');
        url.searchParams.set('numericFilters', 'points>50'); // Only popular stories

        const response = await fetch(url.toString(), {
            next: { revalidate: 1800 } // Cache for 30 minutes
        });

        if (!response.ok) {
            console.warn(`HN Algolia API error: ${response.status}`);
            return [];
        }

        const data: HNSearchResponse = await response.json();

        return data.hits.map(hit => ({
            id: `hn-${hit.objectID}`,
            signalType: detectSignalType(hit.title),
            domains: detectDomains(hit.title),
            source: 'hackernews' as const,
            sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            publishedAt: hit.created_at,
            fetchedAt: new Date().toISOString(),
            whatChanged: hit.title,
            whyItMatters: `Trending on Hacker News with ${hit.points} points and ${hit.num_comments} comments. ${hit.story_text?.substring(0, 150) || ''}`.trim(),
        }));
    } catch (error) {
        console.error('Error fetching from HN Algolia:', error);
        return [];
    }
}

// Fetch front page stories
async function fetchFrontPage(): Promise<Signal[]> {
    try {
        const response = await fetch(
            'https://hn.algolia.com/api/v1/search?tags=front_page',
            { next: { revalidate: 900 } } // Cache for 15 minutes
        );

        if (!response.ok) {
            return [];
        }

        const data: HNSearchResponse = await response.json();

        return data.hits.map(hit => ({
            id: `hn-${hit.objectID}`,
            signalType: detectSignalType(hit.title),
            domains: detectDomains(hit.title),
            source: 'hackernews' as const,
            sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            publishedAt: hit.created_at,
            fetchedAt: new Date().toISOString(),
            whatChanged: hit.title,
            whyItMatters: `Currently on the Hacker News front page with ${hit.points} points and ${hit.num_comments} comments.`,
        }));
    } catch (error) {
        console.error('Error fetching HN front page:', error);
        return [];
    }
}

// Fetch tech-relevant signals
export async function fetchHNSignals(): Promise<Signal[]> {
    const [frontPage, releases, security] = await Promise.all([
        fetchFrontPage(),
        searchHN('release OR launched OR announcing'),
        searchHN('security OR vulnerability OR CVE'),
    ]);

    // Dedupe by objectID
    const seen = new Set<string>();
    const all = [...frontPage, ...releases, ...security].filter(signal => {
        if (seen.has(signal.id)) return false;
        seen.add(signal.id);
        return true;
    });

    return all.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export const hackerNewsApi = {
    fetchSignals: fetchHNSignals,
    fetchFrontPage,
    search: searchHN,
};
