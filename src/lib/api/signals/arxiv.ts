// arXiv API Adapter
// Fetches recent CS/AI research papers from arXiv

import { Signal, Domain } from '@/types/signal';

interface ArxivEntry {
    id: string;
    title: string;
    summary: string;
    authors: string[];
    published: string;
    updated: string;
    categories: string[];
    pdfUrl: string;
    absUrl: string;
}

// Category to domain mapping
const CATEGORY_DOMAINS: Record<string, Domain[]> = {
    'cs.AI': ['ai'],
    'cs.LG': ['ai', 'data'],
    'cs.CL': ['ai'],                    // Computation and Language
    'cs.CV': ['ai'],                    // Computer Vision
    'cs.NE': ['ai'],                    // Neural and Evolutionary Computing
    'cs.CR': ['security'],              // Cryptography and Security
    'cs.DB': ['data'],                  // Databases
    'cs.DC': ['cloud', 'devops'],       // Distributed Computing
    'cs.SE': ['web', 'devops'],         // Software Engineering
    'cs.PL': ['web'],                   // Programming Languages
    'cs.HC': ['web', 'mobile'],         // Human-Computer Interaction
    'stat.ML': ['ai', 'data'],          // Machine Learning (Statistics)
};

// Parse arXiv Atom feed
function parseArxivFeed(xml: string): ArxivEntry[] {
    const entries: ArxivEntry[] = [];

    // Simple regex-based parsing (works for server-side)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
        const entry = match[1];

        const getId = (str: string) => str.match(/<id>([^<]+)<\/id>/)?.[1] || '';
        const getTitle = (str: string) => str.match(/<title>([^<]+)<\/title>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
        const getSummary = (str: string) => str.match(/<summary>([^]*?)<\/summary>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
        const getPublished = (str: string) => str.match(/<published>([^<]+)<\/published>/)?.[1] || '';
        const getUpdated = (str: string) => str.match(/<updated>([^<]+)<\/updated>/)?.[1] || '';

        // Get authors
        const authorRegex = /<author>\s*<name>([^<]+)<\/name>/g;
        const authors: string[] = [];
        let authorMatch;
        while ((authorMatch = authorRegex.exec(entry)) !== null) {
            authors.push(authorMatch[1]);
        }

        // Get categories
        const categoryRegex = /category[^>]*term="([^"]+)"/g;
        const categories: string[] = [];
        let catMatch;
        while ((catMatch = categoryRegex.exec(entry)) !== null) {
            categories.push(catMatch[1]);
        }

        // Get PDF link
        const pdfMatch = entry.match(/link[^>]*href="([^"]*\/pdf\/[^"]+)"/);
        const absMatch = entry.match(/link[^>]*href="([^"]*\/abs\/[^"]+)"/);

        const id = getId(entry);
        const arxivId = id.split('/').pop()?.replace('abs/', '') || id;

        entries.push({
            id: arxivId,
            title: getTitle(entry),
            summary: getSummary(entry),
            authors,
            published: getPublished(entry),
            updated: getUpdated(entry),
            categories,
            pdfUrl: pdfMatch?.[1] || `https://arxiv.org/pdf/${arxivId}`,
            absUrl: absMatch?.[1] || `https://arxiv.org/abs/${arxivId}`,
        });
    }

    return entries;
}

// Determine domains from arXiv categories
function getDomains(categories: string[]): Domain[] {
    const domains = new Set<Domain>();

    for (const cat of categories) {
        const mapped = CATEGORY_DOMAINS[cat];
        if (mapped) {
            mapped.forEach(d => domains.add(d));
        }
    }

    return domains.size > 0 ? Array.from(domains) : ['ai'];
}

// Truncate summary
function truncateSummary(summary: string, maxLength = 280): string {
    if (summary.length <= maxLength) return summary;
    return summary.substring(0, maxLength - 3) + '...';
}

// Fetch papers from specific categories
async function fetchCategory(category: string, maxResults = 10): Promise<ArxivEntry[]> {
    try {
        const url = new URL('https://export.arxiv.org/api/query');
        url.searchParams.set('search_query', `cat:${category}`);
        url.searchParams.set('start', '0');
        url.searchParams.set('max_results', maxResults.toString());
        url.searchParams.set('sortBy', 'submittedDate');
        url.searchParams.set('sortOrder', 'descending');

        const response = await fetch(url.toString(), {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.warn(`arXiv API error for ${category}: ${response.status}`);
            return [];
        }

        const xml = await response.text();
        return parseArxivFeed(xml);
    } catch (error) {
        console.error(`Error fetching arXiv ${category}:`, error);
        return [];
    }
}

// Fetch AI/ML research signals
export async function fetchArxivSignals(): Promise<Signal[]> {
    const priorityCategories = ['cs.AI', 'cs.LG', 'cs.CL', 'cs.CV', 'cs.CR'];

    const allPapers = await Promise.all(
        priorityCategories.map(cat => fetchCategory(cat, 5))
    );

    // Dedupe by ID
    const seen = new Set<string>();
    const papers = allPapers.flat().filter(paper => {
        if (seen.has(paper.id)) return false;
        seen.add(paper.id);
        return true;
    });

    return papers.map(paper => ({
        id: `arxiv-${paper.id}`,
        signalType: 'research' as const,
        domains: getDomains(paper.categories),
        source: 'arxiv' as const,
        sourceUrl: paper.absUrl,
        publishedAt: paper.published,
        fetchedAt: new Date().toISOString(),
        whatChanged: paper.title,
        whyItMatters: truncateSummary(paper.summary),
        paperUrl: paper.pdfUrl,
        whoShouldCare: paper.authors.slice(0, 3),
    }));
}

export const arxivApi = {
    fetchSignals: fetchArxivSignals,
    fetchCategory,
};
