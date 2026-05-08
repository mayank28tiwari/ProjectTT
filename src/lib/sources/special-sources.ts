import { Category } from "@prisma/client";

export const SPECIAL_SOURCES: {
  arxiv: { key: string; name: string; queryUrl: string; category: Category; weight: number };
  hackernews: { key: string; name: string; queryUrl: string; category: Category; weight: number };
  osv: { key: string; name: string; queryUrl: string; category: Category; weight: number; ecosystems: string[] };
  ghsa: { key: string; name: string; category: Category; weight: number };
} = {
  arxiv: {
    key: 'arxiv',
    name: 'arXiv',
    queryUrl: 'http://export.arxiv.org/api/query?search_query=cat:cs.CL+OR+cat:cs.LG+OR+cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=30',
    category: 'Research',
    weight: 0.7,
  },
  hackernews: {
    key: 'hackernews',
    name: 'Hacker News',
    queryUrl: 'http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>=150&hitsPerPage=30',
    category: 'Tools',
    weight: 0.6,
  },
  osv: {
    key: 'osv',
    name: 'OSV',
    queryUrl: 'https://api.osv.dev/v1/query',
    category: 'Security',
    weight: 0.95,
    ecosystems: ['PyPI', 'npm', 'Go', 'crates.io'],
  },
  ghsa: {
    key: 'ghsa',
    name: 'GitHub Security Advisory',
    category: 'Security',
    weight: 0.95,
  },
};
