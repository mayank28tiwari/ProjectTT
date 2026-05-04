// Hacker News Algolia API Adapter
// Fetches tech-relevant stories using the Algolia HN Search API

import { Signal, Category, ImpactLabel } from '@/types/signal';

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

// Category detection based on keywords in title
function detectCategory(title: string): Category {
    const lower = title.toLowerCase();

    if (/\b(ai|gpt|llm|openai|anthropic|claude|gemini|transformer|neural|machine learning|ml|deep learning)\b/.test(lower)) {
        return 'AI';
    }
    if (/\b(security|cve|vulnerability|exploit|breach|hack|ransomware|malware|zero.?day)\b/.test(lower)) {
        return 'Security';
    }
    if (/\b(docker|kubernetes|k8s|ci\/cd|terraform|ansible|helm|devops|infrastructure|deploy)\b/.test(lower)) {
        return 'DevOps';
    }
    if (/\b(aws|gcp|azure|cloud|serverless|lambda|s3|cloudflare)\b/.test(lower)) {
        return 'Cloud';
    }
    if (/\b(database|sql|postgres|mysql|mongodb|redis|kafka|spark|analytics|bigquery)\b/.test(lower)) {
        return 'Data';
    }
    if (/\b(ios|android|swift|kotlin|flutter|react.?native|mobile|app store)\b/.test(lower)) {
        return 'Mobile';
    }
    if (/\b(react|vue|svelte|next\.?js|nuxt|astro|tailwind|css|html|javascript|typescript|frontend)\b/.test(lower)) {
        return 'Web';
    }
    return 'Web'; // Default — most HN content is web-related
}

// Detect impact label from title
function detectImpactLabel(title: string): ImpactLabel {
    const lower = title.toLowerCase();

    if (/\b(security|cve|vulnerability|breach|exploit)\b/.test(lower)) {
        return 'SecurityFix';
    }
    if (/\b(breaking|deprecat|removed|sunset)\b/.test(lower)) {
        return 'BreakingChange';
    }
    if (/\b(faster|performance|optimiz|speed|benchmark)\b/.test(lower)) {
        return 'PerformanceImprovement';
    }
    if (/\b(pricing|cost|free|tier|billing)\b/.test(lower)) {
        return 'CostChange';
    }
    return 'NewCapability';
}

// Search HN for tech-relevant content
async function searchHN(query: string, tags: string = 'story'): Promise<Signal[]> {
    try {
        const url = new URL('https://hn.algolia.com/api/v1/search');
        url.searchParams.set('query', query);
        url.searchParams.set('tags', tags);
        url.searchParams.set('hitsPerPage', '10');
        url.searchParams.set('numericFilters', 'points>50');

        const response = await fetch(url.toString(), {
            next: { revalidate: 1800 }
        });

        if (!response.ok) {
            console.warn(`HN Algolia API error: ${response.status}`);
            return [];
        }

        const data: HNSearchResponse = await response.json();

        return data.hits.map(hit => ({
            id: `hn-${hit.objectID}`,
            title: hit.title,
            summary: `Trending on Hacker News with ${hit.points} points and ${hit.num_comments} comments.`,
            whyItMatters: `Trending on Hacker News with ${hit.points} points and ${hit.num_comments} comments. ${hit.story_text?.substring(0, 150) || ''}`.trim(),
            whoShouldCare: 'Developers, engineers, and tech leaders tracking ecosystem trends.',
            category: detectCategory(hit.title),
            impactLabel: detectImpactLabel(hit.title),
            importance: 'Normal' as const,
            entities: [],
            sourceType: 'hn' as const,
            sourceName: 'Hacker News',
            sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            publishedAt: hit.created_at,
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: `https://news.ycombinator.com/item?id=${hit.objectID}`, title: 'HN Discussion' },
            ],
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
            { next: { revalidate: 900 } }
        );

        if (!response.ok) {
            return [];
        }

        const data: HNSearchResponse = await response.json();

        return data.hits.map(hit => ({
            id: `hn-${hit.objectID}`,
            title: hit.title,
            summary: `Currently on the Hacker News front page with ${hit.points} points.`,
            whyItMatters: `Currently on the Hacker News front page with ${hit.points} points and ${hit.num_comments} comments.`,
            whoShouldCare: 'Developers and tech leaders tracking trending topics.',
            category: detectCategory(hit.title),
            impactLabel: detectImpactLabel(hit.title),
            importance: 'Normal' as const,
            entities: [],
            sourceType: 'hn' as const,
            sourceName: 'Hacker News',
            sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            publishedAt: hit.created_at,
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: `https://news.ycombinator.com/item?id=${hit.objectID}`, title: 'HN Discussion' },
            ],
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
