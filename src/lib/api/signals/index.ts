// Unified Signal Aggregator
// Combines signals from all sources into a single feed

import { Signal, Domain } from '@/types/signal';
import { githubApi } from './github';
import { hackerNewsApi } from './hackernews';
import { arxivApi } from './arxiv';
import { osvApi } from './osv';

export interface FetchSignalsOptions {
    domains?: Domain[];
    limit?: number;
    sources?: Array<'github' | 'hackernews' | 'arxiv' | 'osv'>;
}

// Fetch signals from all sources
export async function fetchAllSignals(options: FetchSignalsOptions = {}): Promise<Signal[]> {
    const {
        domains,
        limit = 50,
        sources = ['github', 'hackernews', 'arxiv', 'osv'],
    } = options;

    const fetchers: Promise<Signal[]>[] = [];

    if (sources.includes('github')) {
        fetchers.push(githubApi.fetchReleases());
    }
    if (sources.includes('hackernews')) {
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

    // Filter by domains if specified
    if (domains && domains.length > 0) {
        allSignals = allSignals.filter(signal =>
            signal.domains.some(d => domains.includes(d))
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
export function generateMockSignals(): Signal[] {
    const mockSignals: Signal[] = [
        {
            id: 'mock-1',
            signalType: 'new_capability',
            domains: ['ai'],
            source: 'github',
            sourceUrl: 'https://github.com/openai/openai-python/releases/tag/v1.50.0',
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'OpenAI Python SDK v1.50.0: New Responses API with streaming',
            whyItMatters: 'Adds native support for the new Responses API, enabling structured outputs and tool use with streaming. Breaking: Completion.create() is now async-only.',
            repoUrl: 'https://github.com/openai/openai-python',
            docsUrl: 'https://platform.openai.com/docs',
        },
        {
            id: 'mock-2',
            signalType: 'breaking_change',
            domains: ['web'],
            source: 'github',
            sourceUrl: 'https://github.com/vercel/next.js/releases/tag/v15.1.0',
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Next.js 15.1: React 19 is now the default',
            whyItMatters: 'React 19 is now the default React version. Pages using older React patterns may need migration. App Router is now the recommended default.',
            repoUrl: 'https://github.com/vercel/next.js',
            docsUrl: 'https://nextjs.org/docs/upgrading',
        },
        {
            id: 'mock-3',
            signalType: 'security_fix',
            domains: ['security', 'web'],
            source: 'osv',
            sourceUrl: 'https://osv.dev/vulnerability/GHSA-1234',
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Critical Vulnerability: axios < 1.7.5 allows SSRF',
            whyItMatters: 'Server-Side Request Forgery vulnerability in axios affects all versions below 1.7.5. Upgrade immediately if you use axios on the server.',
            docsUrl: 'https://github.com/axios/axios/security/advisories',
        },
        {
            id: 'mock-4',
            signalType: 'research',
            domains: ['ai'],
            source: 'arxiv',
            sourceUrl: 'https://arxiv.org/abs/2401.12345',
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Scaling Laws for Reasoning: A Unified Framework',
            whyItMatters: 'New paper from DeepMind presents unified scaling laws for chain-of-thought reasoning, showing 10x compute efficiency gains are possible with optimal prompting.',
            paperUrl: 'https://arxiv.org/pdf/2401.12345',
        },
        {
            id: 'mock-5',
            signalType: 'performance',
            domains: ['data', 'cloud'],
            source: 'github',
            sourceUrl: 'https://github.com/duckdb/duckdb/releases/tag/v1.2.0',
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'DuckDB v1.2.0: 3x faster JSON parsing, native Parquet compression',
            whyItMatters: 'Major performance release with 3x faster JSON ingestion and native zstd Parquet support. Memory usage reduced by 40% for large joins.',
            repoUrl: 'https://github.com/duckdb/duckdb',
            docsUrl: 'https://duckdb.org/docs/changelog',
        },
        {
            id: 'mock-6',
            signalType: 'cost_change',
            domains: ['ai', 'cloud'],
            source: 'hackernews',
            sourceUrl: 'https://news.ycombinator.com/item?id=12345',
            publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Anthropic cuts Claude 3.5 Sonnet pricing by 50%',
            whyItMatters: 'Claude 3.5 Sonnet now costs $1.50/M input tokens (down from $3). Makes it competitive with GPT-4-mini for production workloads.',
        },
        {
            id: 'mock-7',
            signalType: 'new_capability',
            domains: ['devops', 'cloud'],
            source: 'github',
            sourceUrl: 'https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0',
            publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Kubernetes v1.32: Native sidecar containers, improved GPU scheduling',
            whyItMatters: 'Sidecar containers are now GA! Built-in lifecycle management for sidecars. Also adds DRA (Dynamic Resource Allocation) for better GPU/TPU scheduling.',
            repoUrl: 'https://github.com/kubernetes/kubernetes',
            docsUrl: 'https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/',
        },
        {
            id: 'mock-8',
            signalType: 'new_capability',
            domains: ['mobile'],
            source: 'github',
            sourceUrl: 'https://github.com/flutter/flutter/releases/tag/v3.25.0',
            publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Flutter 3.25: Native web components, improved iOS compilation',
            whyItMatters: 'Flutter web apps can now use native web components directly. iOS builds are 25% faster with the new compilation pipeline.',
            repoUrl: 'https://github.com/flutter/flutter',
            docsUrl: 'https://flutter.dev/docs/whats-new',
        },
    ];

    return mockSignals;
}

export const signalAggregator = {
    fetchAll: fetchAllSignals,
    mockSignals: generateMockSignals,
};
