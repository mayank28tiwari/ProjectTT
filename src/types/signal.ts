// Signal Types - Core data model for TokenTalks signals
// Aligned with PRD content model: What changed, Why it matters, Who cares, What to do

export type SignalType =
    | 'breaking_change'
    | 'new_capability'
    | 'security_fix'
    | 'cost_change'
    | 'performance'
    | 'research';

export type Domain =
    | 'ai'
    | 'web'
    | 'devops'
    | 'security'
    | 'cloud'
    | 'data'
    | 'mobile';

export type SignalSource =
    | 'github'
    | 'hackernews'
    | 'arxiv'
    | 'osv'
    | 'manual';

export interface Signal {
    id: string;

    // Type & categorization
    signalType: SignalType;
    domains: Domain[];

    // Source metadata
    source: SignalSource;
    sourceUrl: string;
    sourceIconUrl?: string;

    // Timestamps
    publishedAt: string;
    fetchedAt: string;

    // Content - PRD mandated fields
    whatChanged: string;        // Title - max 100 chars
    whyItMatters: string;       // Summary - max 280 chars
    whoShouldCare?: string[];   // Optional audience tags

    // Actions - "What to do next"
    docsUrl?: string;
    repoUrl?: string;
    paperUrl?: string;
    videoUrl?: string;

    // AI-generated content (optional)
    aiSummary?: string;
    aiTakeaway?: string;

    // User interaction state
    isSaved?: boolean;
    isRead?: boolean;
}

// Signal type display configuration
export const SIGNAL_TYPE_CONFIG: Record<SignalType, { label: string; color: string; bgColor: string }> = {
    breaking_change: {
        label: 'Breaking Change',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/20'
    },
    new_capability: {
        label: 'New Capability',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    security_fix: {
        label: 'Security Fix',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-500/10 border-amber-500/20'
    },
    cost_change: {
        label: 'Cost Change',
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-500/10 border-purple-500/20'
    },
    performance: {
        label: 'Performance',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    research: {
        label: 'Research',
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-500/10 border-cyan-500/20'
    }
};

// Domain display configuration
export const DOMAIN_CONFIG: Record<Domain, { label: string; color: string }> = {
    ai: { label: 'AI', color: 'text-violet-500' },
    web: { label: 'Web', color: 'text-orange-500' },
    devops: { label: 'DevOps', color: 'text-teal-500' },
    security: { label: 'Security', color: 'text-red-500' },
    cloud: { label: 'Cloud', color: 'text-sky-500' },
    data: { label: 'Data', color: 'text-emerald-500' },
    mobile: { label: 'Mobile', color: 'text-pink-500' }
};

// Source display configuration
export const SOURCE_CONFIG: Record<SignalSource, { label: string; icon: string }> = {
    github: { label: 'GitHub', icon: '/icons/github.svg' },
    hackernews: { label: 'Hacker News', icon: '/icons/hn.svg' },
    arxiv: { label: 'arXiv', icon: '/icons/arxiv.svg' },
    osv: { label: 'OSV', icon: '/icons/osv.svg' },
    manual: { label: 'Manual', icon: '/icons/manual.svg' }
};
