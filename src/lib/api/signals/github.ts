// GitHub Releases API Adapter
// Fetches release signals from popular repositories

import { Signal, Category, ImpactLabel } from '@/types/signal';

// Key repositories to track - organized by category
const TRACKED_REPOS: Array<{ owner: string; repo: string; category: Category }> = [
    // AI/ML
    { owner: 'openai', repo: 'openai-python', category: 'AI' },
    { owner: 'langchain-ai', repo: 'langchain', category: 'AI' },
    { owner: 'huggingface', repo: 'transformers', category: 'AI' },
    { owner: 'anthropics', repo: 'anthropic-sdk-python', category: 'AI' },

    // Web/Frontend
    { owner: 'vercel', repo: 'next.js', category: 'Web' },
    { owner: 'facebook', repo: 'react', category: 'Web' },
    { owner: 'sveltejs', repo: 'svelte', category: 'Web' },
    { owner: 'vuejs', repo: 'core', category: 'Web' },
    { owner: 'tailwindlabs', repo: 'tailwindcss', category: 'Web' },

    // DevOps/Cloud
    { owner: 'docker', repo: 'cli', category: 'DevOps' },
    { owner: 'kubernetes', repo: 'kubernetes', category: 'DevOps' },
    { owner: 'terraform-providers', repo: 'terraform-provider-aws', category: 'Cloud' },

    // Data
    { owner: 'apache', repo: 'spark', category: 'Data' },
    { owner: 'duckdb', repo: 'duckdb', category: 'Data' },

    // Mobile
    { owner: 'flutter', repo: 'flutter', category: 'Mobile' },
    { owner: 'facebook', repo: 'react-native', category: 'Mobile' },
];

interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string;
    body: string;
    html_url: string;
    published_at: string;
    prerelease: boolean;
    draft: boolean;
}

// Detect impact label from release content
function detectImpactLabel(release: GitHubRelease): ImpactLabel {
    const content = `${release.name} ${release.body}`.toLowerCase();

    if (content.includes('breaking') || content.includes('deprecat') || content.includes('removed')) {
        return 'BreakingChange';
    }
    if (content.includes('security') || content.includes('cve') || content.includes('vulnerability')) {
        return 'SecurityFix';
    }
    if (content.includes('performance') || content.includes('faster') || content.includes('optimiz')) {
        return 'PerformanceImprovement';
    }
    return 'NewCapability';
}

// Extract a summary from release body
function extractSummary(body: string, maxLength = 280): string {
    if (!body) return 'New release available. Check the release notes for details.';

    let clean = body
        .replace(/#{1,6}\s*/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/^\s*[-*]\s*/gm, '• ')
        .replace(/\n{2,}/g, ' ')
        .trim();

    if (clean.length > maxLength) {
        clean = clean.substring(0, maxLength - 3) + '...';
    }

    return clean || 'New release available. Check the release notes for details.';
}

// Fetch releases for a single repo
async function fetchRepoReleases(
    owner: string,
    repo: string,
    category: Category
): Promise<Signal[]> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases?per_page=3`,
            {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
                next: { revalidate: 3600 }
            }
        );

        if (!response.ok) {
            console.warn(`GitHub API error for ${owner}/${repo}: ${response.status}`);
            return [];
        }

        const releases: GitHubRelease[] = await response.json();

        return releases
            .filter(r => !r.draft && !r.prerelease)
            .map(release => ({
                id: `github-${owner}-${repo}-${release.id}`,
                title: `${repo} ${release.tag_name}${release.name && release.name !== release.tag_name ? `: ${release.name}` : ''}`,
                summary: extractSummary(release.body),
                whyItMatters: extractSummary(release.body),
                whoShouldCare: `Developers using ${repo} in production.`,
                category,
                impactLabel: detectImpactLabel(release),
                importance: 'Normal' as const,
                entities: [repo],
                sourceType: 'github' as const,
                sourceName: 'GitHub',
                sourceUrl: release.html_url,
                publishedAt: release.published_at,
                fetchedAt: new Date().toISOString(),
                citations: [
                    { url: release.html_url, title: 'Release Notes' },
                ],
            }));
    } catch (error) {
        console.error(`Error fetching releases for ${owner}/${repo}:`, error);
        return [];
    }
}

// Fetch all tracked GitHub releases
export async function fetchGitHubReleases(): Promise<Signal[]> {
    const allReleases = await Promise.all(
        TRACKED_REPOS.map(({ owner, repo, category }) =>
            fetchRepoReleases(owner, repo, category)
        )
    );

    return allReleases
        .flat()
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export const githubApi = {
    fetchReleases: fetchGitHubReleases,
    trackedRepos: TRACKED_REPOS,
};
