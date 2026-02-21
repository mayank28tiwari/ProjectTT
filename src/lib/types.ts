export type TokenTokenType = 'news' | 'research' | 'video' | 'blog' | 'release';

export interface TokenAiSummary {
  tldr: string;
  whyItMatters: string[];
  whoItsFor: string;
  prerequisites: string[];
}

export interface TokenItem {
  id: string;
  title: string;
  shortSummary: string; // The "Token" (50-90 words)
  aiSummary?: TokenAiSummary;
  url: string;
  sourceName: string;
  publishedAt: string; // ISO string
  type: TokenTokenType;
  domains: string[]; // e.g. ["AI", "Web", "Security"]
  tags: string[]; // e.g. ["React", "Llama 3", "Next.js"]
  thumbnailUrl?: string;
  author?: string;
  relevanceScore?: number; // Internal scoring
  isSaved?: boolean; // Client-side state
}

export interface TokenFeedFilters {
  domains?: string[];
  types?: TokenTokenType[];
  timeRange?: '24h' | '7d' | '30d' | 'all';
  searchQuery?: string;
  sortBy?: 'latest' | 'trending' | 'saved';
}

export interface UserPreferences {
  followedDomains: string[];
  followedKeywords: string[];
  savedItems: string[]; // IDs
  theme: 'light' | 'dark' | 'system';
}
