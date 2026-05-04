'use client';

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SignalCard } from "@/components/feed/SignalCard";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { AuthGateModal } from "@/components/auth/AuthGateModal";
import { Skeleton } from "@/components/ui/skeleton";
import { signalAggregator } from "@/lib/api/signals";
import { Signal, Category } from "@/types/signal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rss, User } from "lucide-react";

export function FeedContainer() {
    const { data: session } = useSession();
    const [activeCategory, setActiveCategory] = React.useState<Category | 'all'>('all');
    const [activeTab, setActiveTab] = React.useState<'stream' | 'my-signals'>('stream');
    const [savedSignals, setSavedSignals] = React.useState<Set<string>>(new Set());
    const [showAuthGate, setShowAuthGate] = React.useState(false);

    // Fetch Feed Meta (Freshness Indicator)
    const { data: meta } = useQuery({
        queryKey: ['meta'],
        queryFn: async () => {
            const res = await fetch("/api/meta");
            if (!res.ok) throw new Error("Failed to fetch meta");
            return res.json();
        },
        refetchInterval: 60000, // poll every minute
    });

    // Fetch Token Stream
    const { data: streamData, isLoading: isLoadingStream, error: streamError } = useQuery({
        queryKey: ['signals', 'stream', activeCategory],
        queryFn: async () => {
            const url = new URL("/api/signals", window.location.href);
            if (activeCategory !== 'all') {
                url.searchParams.set("category", activeCategory);
            }
            const res = await fetch(url.toString());
            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
    });

    // Fetch My Signals
    const { data: mySignalsData, isLoading: isLoadingMySignals } = useQuery({
        queryKey: ['signals', 'my-signals'],
        queryFn: async () => {
            if (!session) return { items: [] };
            const res = await fetch("/api/my-signals");
            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
        enabled: !!session && activeTab === 'my-signals',
    });

    const handleSave = async (id: string) => {
        if (!session) {
            setShowAuthGate(true);
            return;
        }

        // Optimistic UI update
        setSavedSignals(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

        fetch("/api/saved/toggle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ signalId: id })
        }).catch(() => {
            // Revert on failure
            setSavedSignals(prev => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
            });
        });
    };

    const handleTabChange = (tab: string) => {
        const newTab = tab as 'stream' | 'my-signals';
        if (newTab === 'my-signals' && !session) {
            setShowAuthGate(true);
            return;
        }
        setActiveTab(newTab);
    };

    // Determine what to show
    const currentItems = activeTab === 'stream'
        ? streamData?.items || []
        : mySignalsData?.items || [];

    const isLoading = activeTab === 'stream' ? isLoadingStream : isLoadingMySignals;

    React.useEffect(() => {
        // Sync saved signals from API into the Set on load
        if (streamData?.items) {
            const saved = streamData.items.filter((s: any) => s.isSaved).map((s: any) => s.id);
            setSavedSignals(new Set(saved));
        }
    }, [streamData]);

    const displayedSignals = currentItems.map((s: any) => ({
        ...s,
        isSaved: savedSignals.has(s.id) || s.isSaved,
    }));

    if (streamError && activeTab === 'stream') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <p className="text-muted-foreground mb-4">Unable to load signals. Please try again.</p>
                <button onClick={() => window.location.reload()} className="text-primary hover:underline text-sm">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <AuthGateModal open={showAuthGate} onOpenChange={setShowAuthGate} />

            {/* Header with Tabs & Freshness */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center mb-2">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-2/3">
                            <TabsList className="w-full grid grid-cols-2 h-9">
                                <TabsTrigger value="stream" className="text-xs gap-1.5">
                                    <Rss className="w-3.5 h-3.5" />
                                    Token Stream
                                </TabsTrigger>
                                <TabsTrigger value="my-signals" className="text-xs gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    My Signals
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="text-[10px] text-muted-foreground text-right pl-4">
                            Stream flowed: <br className="sm:hidden" />
                            <span className="font-mono text-foreground/80">
                                {meta?.tokenStreamLastFlowedAt
                                    ? new Date(meta.tokenStreamLastFlowedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : "Just now"}
                            </span>
                        </div>
                    </div>
                </div>

                <FeedFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </div>

            {/* Signal Feed */}
            <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-20 space-y-3">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-3 p-4 border border-border/40 rounded-xl bg-card">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-24 rounded-full" />
                                <Skeleton className="h-4 w-12" />
                                <div className="flex-1" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-5 w-4/5" />
                            <Skeleton className="h-12 w-full" />
                            <div className="flex gap-2 pt-2 border-t border-border/40">
                                <Skeleton className="h-6 w-14 rounded" />
                                <Skeleton className="h-6 w-14 rounded" />
                                <div className="flex-1" />
                                <Skeleton className="h-6 w-16 rounded" />
                            </div>
                        </div>
                    ))
                ) : displayedSignals.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-sm">
                            {activeTab === 'my-signals'
                                ? "No saved signals yet. Save signals from the Token Stream to see them here."
                                : "No signals found for this filter."}
                        </p>
                    </div>
                ) : (
                    displayedSignals.map((signal: Signal & { isSaved?: boolean }) => (
                        <SignalCard
                            key={signal.id}
                            signal={signal}
                            onSave={handleSave}
                        />
                    ))
                )}

                {!isLoading && displayedSignals.length > 0 && (
                    <div className="text-center py-8">
                        <p className="text-xs text-muted-foreground">
                            {activeTab === 'my-signals'
                                ? `${displayedSignals.length} saved signal${displayedSignals.length !== 1 ? 's' : ''}`
                                : "You're all caught up!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
