import { TokenItem, TokenTokenType } from "@/lib/types";

// Helper to determine type from source/content
function determineType(item: any): TokenTokenType {
    if (item.video_url) return 'video';
    if (item.title.toLowerCase().includes('release') || item.title.includes('v1.')) return 'release';
    if (item.source_id === 'medium' || item.source_id === 'dev_to') return 'blog';
    if (item.title.toLowerCase().includes('paper') || item.title.toLowerCase().includes('research')) return 'research';
    return 'news';
}

function determineDomains(item: any): string[] {
    const text = (item.title + ' ' + item.description).toLowerCase();
    const domains: string[] = [];
    if (text.includes('ai') || text.includes('gpt') || text.includes('llm')) domains.push('AI');
    if (text.includes('react') || text.includes('next.js') || text.includes('css')) domains.push('Web');
    if (text.includes('kubernetes') || text.includes('docker') || text.includes('cloud')) domains.push('DevOps');
    if (text.includes('security') || text.includes('hack')) domains.push('Security');
    if (item.category && Array.isArray(item.category)) {
        item.category.forEach((c: string) => domains.push(c.charAt(0).toUpperCase() + c.slice(1)));
    }
    return Array.from(new Set(domains)).slice(0, 3);
}

export function toTokenItem(apiResult: any): TokenItem {
    // Mapping logic for NewsData.io format (which uses the pub_ key usually)
    // Or generic mapping if we assume standard NewsAPI.org
    // Given the key format 'pub_', it's likely NewsData.io

    const type = determineType(apiResult);

    return {
        id: apiResult.article_id || apiResult.link || Math.random().toString(), // unique id
        title: apiResult.title,
        shortSummary: apiResult.description?.slice(0, 150) + '...' || 'No summary available.',
        url: apiResult.link,
        sourceName: apiResult.source_id || 'Unknown',
        publishedAt: apiResult.pubDate,
        type: type,
        domains: determineDomains(apiResult),
        tags: apiResult.keywords || [],
        thumbnailUrl: apiResult.image_url,
        author: apiResult.creator ? apiResult.creator[0] : undefined,
        aiSummary: {
            tldr: apiResult.description || "No AI summary generated yet.",
            whyItMatters: ["Updates in the tech ecosystem", "Impacts developers"],
            whoItsFor: "Tech enthusiasts",
            prerequisites: []
        }
    };
}
