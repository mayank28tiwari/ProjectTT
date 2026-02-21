import { TokenItem, TokenFeedFilters } from "@/lib/types";
import { toTokenItem } from "@/lib/mappers/toTokenItem";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'pub_aeae55d63b684b3b9462d052ce975c40';
const BASE_URL = 'https://newsdata.io/api/1/news';

// Mock data for fallback
const MOCK_ITEMS: TokenItem[] = [
    {
        id: 'mock-1',
        title: 'OpenAI Releases GPT-5 with Enhanced Reasoning',
        shortSummary: 'OpenAI has officially unveiled GPT-5, featuring advanced reasoning capabilities and a 128k context window standard across all models.',
        url: 'https://openai.com/blog',
        sourceName: 'OpenAI Blog',
        publishedAt: new Date().toISOString(),
        type: 'release',
        domains: ['AI', 'Models'],
        tags: ['GPT-5', 'LLM', 'AI Safety'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
        aiSummary: {
            tldr: 'GPT-5 launches with better reasoning.',
            whyItMatters: ['Sets new benchmark for LLMs', 'Reduces hallucination rates'],
            whoItsFor: 'AI Developers & Researchers',
            prerequisites: ['Basic LLM knowledge']
        }
    },
    {
        id: 'mock-2',
        title: 'React 19 Server Components: A Deep Dive',
        shortSummary: 'The React team explains the philosophy behind Server Components in React 19 and how they simplify data fetching.',
        url: 'https://react.dev',
        sourceName: 'React Blog',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        type: 'blog',
        domains: ['Web', 'Frontend'],
        tags: ['React', 'RSC', 'JavaScript'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
        aiSummary: {
            tldr: 'React 19 stabilizes RSCs.',
            whyItMatters: ['Changes how we build React apps', 'Performance improvements'],
            whoItsFor: 'Frontend Engineers',
            prerequisites: ['React knowledge']
        }
    },
    {
        id: 'mock-3',
        title: 'Kubernetes v1.30: What is new?',
        shortSummary: 'The latest Kubernetes release brings structured logging, resize policy for pods, and dynamic resource allocation improvements.',
        url: 'https://kubernetes.io',
        sourceName: 'K8s Blog',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        type: 'release',
        domains: ['DevOps', 'Cloud'],
        tags: ['K8s', 'Containers'],
    }
];

export const googleNewsApi = {
    fetchTop: async (filters?: TokenFeedFilters): Promise<TokenItem[]> => {
        try {
            if (!API_KEY) throw new Error("No API Key");

            // NewsData.io params
            const params = new URLSearchParams({
                apikey: API_KEY,
                language: 'en',
                category: 'technology',
            });

            if (filters?.searchQuery) params.append('q', filters.searchQuery);

            const response = await fetch(`${BASE_URL}?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch news');

            const data = await response.json();
            if (data.status !== 'success') throw new Error(data.results?.message || 'API Error');

            return data.results.map(toTokenItem);
        } catch (error) {
            console.error("News API Error, using mock:", error);
            return MOCK_ITEMS;
        }
    },

    search: async (query: string): Promise<TokenItem[]> => {
        try {
            const params = new URLSearchParams({
                apikey: API_KEY,
                language: 'en',
                q: query,
            });
            const response = await fetch(`${BASE_URL}?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch news');

            const data = await response.json();
            return data.results.map(toTokenItem);
        } catch (error) {
            return MOCK_ITEMS.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.shortSummary.toLowerCase().includes(query.toLowerCase()));
        }
    },

    fetchById: async (id: string): Promise<TokenItem | undefined> => {
        // In a real app, this might fetch from a specific endpoint or database.
        // For this implementation effectively utilizing NewsData.io, we might not have a direct ID fetch that persists well.
        // We will search for it or return from Mock.

        // Check mocks first
        const mock = MOCK_ITEMS.find(i => i.id === id);
        if (mock) return mock;

        return undefined; // In a full app, we'd fetch or use the cache from TanStack Query
    }
};
