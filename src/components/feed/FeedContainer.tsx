'use client';

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { SignalCard } from "@/components/feed/SignalCard";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { signalAggregator } from "@/lib/api/signals";
import { Signal, Domain } from "@/types/signal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rss, User } from "lucide-react";

export function FeedContainer() {
    const [activeDomain, setActiveDomain] = React.useState<Domain | 'all'>('all');
    const [activeTab, setActiveTab] = React.useState<'stream' | 'my-tokens'>('stream');
    const [savedSignals, setSavedSignals] = React.useState<Set<string>>(new Set());

    // For now, use mock signals. In production, switch to signalAggregator.fetchAll()
    const { data: signals, isLoading, error } = useQuery({
        queryKey: ['signals', activeDomain],
        queryFn: async () => {
            // Use mock signals for demo - switch to real API when ready:
            // return signalAggregator.fetchAll({ 
            //     domains: activeDomain === 'all' ? undefined : [activeDomain],
            //     limit: 30 
            // });

            let allSignals = signalAggregator.mockSignals();

            if (activeDomain !== 'all') {
                allSignals = allSignals.filter(s => s.domains.includes(activeDomain));
            }

            return allSignals;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const handleSave = (id: string) => {
        setSavedSignals(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Enrich signals with saved state
    const enrichedSignals = React.useMemo(() => {
        if (!signals) return [];
        return signals.map(signal => ({
            ...signal,
            isSaved: savedSignals.has(signal.id),
        }));
    }, [signals, savedSignals]);

    // Filter for "My Tokens" tab
    const displayedSignals = activeTab === 'my-tokens'
        ? enrichedSignals.filter(s => s.isSaved)
        : enrichedSignals;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <p className="text-muted-foreground mb-4">Unable to load signals. Please try again.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-primary hover:underline text-sm"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header with Tabs */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    {/* Feed Toggle Tabs */}
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'stream' | 'my-tokens')}>
                        <TabsList className="w-full grid grid-cols-2 h-9">
                            <TabsTrigger value="stream" className="text-xs gap-1.5">
                                <Rss className="w-3.5 h-3.5" />
                                Token Stream
                            </TabsTrigger>
                            <TabsTrigger value="my-tokens" className="text-xs gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                My Tokens
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Domain Filters */}
                <FeedFilters
                    activeDomain={activeDomain}
                    onDomainChange={setActiveDomain}
                />
            </div>

            {/* Signal Feed */}
            <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-20 space-y-3">
                {isLoading ? (
                    // Skeleton Loading State
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
                            {activeTab === 'my-tokens'
                                ? "No saved signals yet. Save signals from the Token Stream to see them here."
                                : "No signals found for this filter."}
                        </p>
                    </div>
                ) : (
                    displayedSignals.map((signal) => (
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
                            {activeTab === 'my-tokens'
                                ? `${displayedSignals.length} saved signal${displayedSignals.length !== 1 ? 's' : ''}`
                                : "You're all caught up!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
