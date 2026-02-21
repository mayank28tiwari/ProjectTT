// GitHub Releases API Adapter
// Fetches release signals from popular repositories

import { Signal, SignalType, Domain } from '@/types/signal';

// Key repositories to track - organized by domain
const TRACKED_REPOS: Array<{ owner: string; repo: string; domains: Domain[] }> = [
    // AI/ML
    { owner: 'openai', repo: 'openai-python', domains: ['ai'] },
    { owner: 'langchain-ai', repo: 'langchain', domains: ['ai'] },
    { owner: 'huggingface', repo: 'transformers', domains: ['ai', 'data'] },
    { owner: 'anthropics', repo: 'anthropic-sdk-python', domains: ['ai'] },

    // Web/Frontend
    { owner: 'vercel', repo: 'next.js', domains: ['web'] },
    { owner: 'facebook', repo: 'react', domains: ['web'] },
    { owner: 'sveltejs', repo: 'svelte', domains: ['web'] },
    { owner: 'vuejs', repo: 'core', domains: ['web'] },
    { owner: 'tailwindlabs', repo: 'tailwindcss', domains: ['web'] },

    // DevOps/Cloud
    { owner: 'docker', repo: 'cli', domains: ['devops', 'cloud'] },
    { owner: 'kubernetes', repo: 'kubernetes', domains: ['devops', 'cloud'] },
    { owner: 'terraform-providers', repo: 'terraform-provider-aws', domains: ['cloud', 'devops'] },

    // Data
    { owner: 'apache', repo: 'spark', domains: ['data'] },
    { owner: 'duckdb', repo: 'duckdb', domains: ['data'] },

    // Mobile
    { owner: 'flutter', repo: 'flutter', domains: ['mobile'] },
    { owner: 'facebook', repo: 'react-native', domains: ['mobile', 'web'] },
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

// Detect signal type from release content
function detectSignalType(release: GitHubRelease): SignalType {
    const content = `${release.name} ${release.body}`.toLowerCase();

    if (content.includes('breaking') || content.includes('deprecat') || content.includes('removed')) {
        return 'breaking_change';
    }
    if (content.includes('security') || content.includes('cve') || content.includes('vulnerability')) {
        return 'security_fix';
    }
    if (content.includes('performance') || content.includes('faster') || content.includes('optimiz')) {
        return 'performance';
    }
    return 'new_capability';
}

// Extract a summary from release body
function extractSummary(body: string, maxLength = 280): string {
    if (!body) return 'New release available. Check the release notes for details.';

    // Clean up markdown
    let clean = body
        .replace(/#{1,6}\s*/g, '')           // Remove headers
        .replace(/\*\*([^*]+)\*\*/g, '$1')   // Remove bold
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text only
        .replace(/```[\s\S]*?```/g, '')      // Remove code blocks
        .replace(/`[^`]+`/g, '')             // Remove inline code
        .replace(/^\s*[-*]\s*/gm, '• ')      // Normalize bullets
        .replace(/\n{2,}/g, ' ')             // Collapse newlines
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
    domains: Domain[]
): Promise<Signal[]> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases?per_page=3`,
            {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                    // Note: Add auth token in production for higher rate limits
                },
                next: { revalidate: 3600 } // Cache for 1 hour
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
                signalType: detectSignalType(release),
                domains,
                source: 'github' as const,
                sourceUrl: release.html_url,
                publishedAt: release.published_at,
                fetchedAt: new Date().toISOString(),
                whatChanged: `${repo} ${release.tag_name}${release.name && release.name !== release.tag_name ? `: ${release.name}` : ''}`,
                whyItMatters: extractSummary(release.body),
                repoUrl: `https://github.com/${owner}/${repo}`,
                docsUrl: `https://github.com/${owner}/${repo}/releases/tag/${release.tag_name}`,
            }));
    } catch (error) {
        console.error(`Error fetching releases for ${owner}/${repo}:`, error);
        return [];
    }
}

// Fetch all tracked GitHub releases
export async function fetchGitHubReleases(): Promise<Signal[]> {
    const allReleases = await Promise.all(
        TRACKED_REPOS.map(({ owner, repo, domains }) =>
            fetchRepoReleases(owner, repo, domains)
        )
    );

    // Flatten and sort by date
    return allReleases
        .flat()
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export const githubApi = {
    fetchReleases: fetchGitHubReleases,
    trackedRepos: TRACKED_REPOS,
};
