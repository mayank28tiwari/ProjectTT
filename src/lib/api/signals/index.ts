// Unified Signal Aggregator
// Combines signals from all sources into a single feed

import { Signal, Category } from '@/types/signal';
import { githubApi } from './github';
import { hackerNewsApi } from './hackernews';
import { arxivApi } from './arxiv';
import { osvApi } from './osv';

export interface FetchSignalsOptions {
    categories?: Category[];
    limit?: number;
    sources?: Array<'github' | 'hn' | 'arxiv' | 'osv'>;
}

// Fetch signals from all sources
export async function fetchAllSignals(options: FetchSignalsOptions = {}): Promise<Signal[]> {
    const {
        categories,
        limit = 50,
        sources = ['github', 'hn', 'arxiv', 'osv'],
    } = options;

    const fetchers: Promise<Signal[]>[] = [];

    if (sources.includes('github')) {
        fetchers.push(githubApi.fetchReleases());
    }
    if (sources.includes('hn')) {
        fetchers.push(hackerNewsApi.fetchSignals());
    }
    if (sources.includes('arxiv')) {
        fetchers.push(arxivApi.fetchSignals());
    }
    if (sources.includes('osv')) {
        fetchers.push(osvApi.fetchSignals());
    }

    const results = await Promise.allSettled(fetchers);

    let allSignals: Signal[] = results
        .filter((r): r is PromiseFulfilledResult<Signal[]> => r.status === 'fulfilled')
        .flatMap(r => r.value);

    // Filter by categories if specified
    if (categories && categories.length > 0) {
        allSignals = allSignals.filter(signal =>
            categories.includes(signal.category)
        );
    }

    // Sort by published date (newest first)
    allSignals.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Limit results
    return allSignals.slice(0, limit);
}

// Generate mock signals for development/demo
// All fields conform to the Signal Standard (PRD v1)
export function generateMockSignals(): Signal[] {
    const mockSignals: Signal[] = [
        {
            id: 'mock-1',
            title: 'OpenAI Python SDK v1.50.0: New Responses API with streaming',
            summary: 'Major SDK release adds native Responses API support with streaming, structured outputs, and tool-use capabilities.',
            whyItMatters: 'Adds native support for the new Responses API, enabling structured outputs and tool use with streaming. Breaking: Completion.create() is now async-only.',
            whoShouldCare: 'AI Engineers using OpenAI Python SDK, teams with production LLM pipelines.',
            category: 'AI',
            impactLabel: 'NewCapability',
            importance: 'Important',
            entities: ['openai-python', 'openai'],
            sourceType: 'github',
            sourceName: 'GitHub',
            sourceUrl: 'https://github.com/openai/openai-python/releases/tag/v1.50.0',
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/openai/openai-python/releases/tag/v1.50.0', title: 'Release Notes' },
            ],
        },
        {
            id: 'mock-2',
            title: 'Next.js 15.1: React 19 is now the default',
            summary: 'React 19 becomes the default React version in Next.js 15.1, with App Router as the recommended default.',
            whyItMatters: 'React 19 is now the default React version. Pages using older React patterns may need migration. App Router is now the recommended default.',
            whoShouldCare: 'Frontend engineers, full-stack developers using Next.js in production.',
            category: 'Web',
            impactLabel: 'BreakingChange',
            importance: 'Critical',
            entities: ['next.js', 'react'],
            sourceType: 'github',
            sourceName: 'GitHub',
            sourceUrl: 'https://github.com/vercel/next.js/releases/tag/v15.1.0',
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/vercel/next.js/releases/tag/v15.1.0', title: 'Release Notes' },
                { url: 'https://nextjs.org/docs/upgrading', title: 'Migration Guide' },
            ],
        },
        {
            id: 'mock-3',
            title: 'Critical Vulnerability: axios < 1.7.5 allows SSRF',
            summary: 'Server-Side Request Forgery vulnerability discovered in axios affecting all versions below 1.7.5.',
            whyItMatters: 'Server-Side Request Forgery vulnerability in axios affects all versions below 1.7.5. Upgrade immediately if you use axios on the server.',
            whoShouldCare: 'Backend engineers, security teams, anyone using axios for server-side HTTP calls.',
            category: 'Security',
            impactLabel: 'SecurityFix',
            importance: 'Critical',
            entities: ['axios'],
            sourceType: 'osv',
            sourceName: 'OSV',
            sourceUrl: 'https://osv.dev/vulnerability/GHSA-1234',
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/axios/axios/security/advisories', title: 'Security Advisory' },
            ],
        },
        {
            id: 'mock-4',
            title: 'Scaling Laws for Reasoning: A Unified Framework',
            summary: 'New DeepMind paper proposes unified scaling laws for chain-of-thought reasoning with 10x compute efficiency gains.',
            whyItMatters: 'Presents unified scaling laws for chain-of-thought reasoning, showing 10x compute efficiency gains are possible with optimal prompting.',
            whoShouldCare: 'AI researchers, ML engineers building reasoning-heavy systems, LLM infrastructure teams.',
            category: 'AI',
            impactLabel: 'NewCapability',
            importance: 'Normal',
            entities: ['deepmind', 'chain-of-thought'],
            sourceType: 'arxiv',
            sourceName: 'arXiv',
            sourceUrl: 'https://arxiv.org/abs/2401.12345',
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://arxiv.org/abs/2401.12345', title: 'Paper' },
            ],
        },
        {
            id: 'mock-5',
            title: 'DuckDB v1.2.0: 3x faster JSON parsing, native Parquet compression',
            summary: 'Major performance release with 3x faster JSON ingestion, native zstd Parquet support, and 40% memory reduction for large joins.',
            whyItMatters: 'Major performance release with 3x faster JSON ingestion and native zstd Parquet support. Memory usage reduced by 40% for large joins.',
            whoShouldCare: 'Data engineers, analytics teams using DuckDB for OLAP workloads.',
            category: 'Data',
            impactLabel: 'PerformanceImprovement',
            importance: 'Important',
            entities: ['duckdb'],
            sourceType: 'github',
            sourceName: 'GitHub',
            sourceUrl: 'https://github.com/duckdb/duckdb/releases/tag/v1.2.0',
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/duckdb/duckdb/releases/tag/v1.2.0', title: 'Release Notes' },
                { url: 'https://duckdb.org/docs/changelog', title: 'Changelog' },
            ],
        },
        {
            id: 'mock-6',
            title: 'Anthropic cuts Claude 3.5 Sonnet pricing by 50%',
            summary: 'Claude 3.5 Sonnet price drops to $1.50/M input tokens, making it competitive with GPT-4-mini for production use.',
            whyItMatters: 'Claude 3.5 Sonnet now costs $1.50/M input tokens (down from $3). Makes it competitive with GPT-4-mini for production workloads.',
            whoShouldCare: 'AI Engineers, CTOs evaluating LLM cost, teams running Claude in production.',
            category: 'AI',
            impactLabel: 'CostChange',
            importance: 'Severe',
            entities: ['claude', 'anthropic'],
            sourceType: 'hn',
            sourceName: 'Hacker News',
            sourceUrl: 'https://news.ycombinator.com/item?id=12345',
            publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://news.ycombinator.com/item?id=12345', title: 'HN Discussion' },
            ],
        },
        {
            id: 'mock-7',
            title: 'Kubernetes v1.32: Native sidecar containers, improved GPU scheduling',
            summary: 'Sidecar containers reach GA status with built-in lifecycle management. DRA adds better GPU/TPU scheduling.',
            whyItMatters: 'Sidecar containers are now GA! Built-in lifecycle management for sidecars. Also adds DRA (Dynamic Resource Allocation) for better GPU/TPU scheduling.',
            whoShouldCare: 'DevOps/SRE teams, platform engineers managing Kubernetes clusters.',
            category: 'DevOps',
            impactLabel: 'NewCapability',
            importance: 'Important',
            entities: ['kubernetes'],
            sourceType: 'github',
            sourceName: 'GitHub',
            sourceUrl: 'https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0',
            publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0', title: 'Release Notes' },
                { url: 'https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/', title: 'Sidecar Docs' },
            ],
        },
        {
            id: 'mock-8',
            title: 'Flutter 3.25: Native web components, improved iOS compilation',
            summary: 'Flutter web apps can now use native web components directly. iOS builds are 25% faster with the new compilation pipeline.',
            whyItMatters: 'Flutter web apps can now use native web components directly. iOS builds are 25% faster with the new compilation pipeline.',
            whoShouldCare: 'Mobile developers, cross-platform teams using Flutter.',
            category: 'Mobile',
            impactLabel: 'NewCapability',
            importance: 'Normal',
            entities: ['flutter'],
            sourceType: 'github',
            sourceName: 'GitHub',
            sourceUrl: 'https://github.com/flutter/flutter/releases/tag/v3.25.0',
            publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: 'https://github.com/flutter/flutter/releases/tag/v3.25.0', title: 'Release Notes' },
            ],
        },
    ];

    return mockSignals;
}

export const signalAggregator = {
    fetchAll: fetchAllSignals,
    mockSignals: generateMockSignals,
};
