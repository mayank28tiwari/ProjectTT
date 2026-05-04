'use client';

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { SoftGateModal } from "@/components/auth/SoftGateModal";
import { Button } from "@/components/ui/button";
import { Radar, ExternalLink, CalendarDays, Loader2, ArrowRight } from "lucide-react";
import { AnticipatedItem } from "@/types/signal";

const CONFIDENCE_COLORS = {
    Low: "bg-muted text-muted-foreground border-border",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    High: "bg-green-500/10 text-green-500 border-green-500/20",
    Confirmed: "bg-primary/10 text-primary border-primary/20",
};

export default function AnticipatedPage() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const [showSoftGate, setShowSoftGate] = React.useState(false);

    // Fetch Anticipated Items
    const { data: items = [], isLoading } = useQuery({
        queryKey: ["anticipated"],
        queryFn: async () => {
            const res = await fetch("/api/anticipated");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            return data.items as (AnticipatedItem & { isTracking?: boolean })[];
        }
    });

    // Track Mutation
    const trackMutation = useMutation({
        mutationFn: async (itemId: string) => {
            if (!session) {
                setShowSoftGate(true);
                throw new Error("unauth");
            }
            const res = await fetch("/api/anticipated/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ anticipatedItemId: itemId })
            });
            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
        onMutate: async (itemId) => {
            await queryClient.cancelQueries({ queryKey: ["anticipated"] });
            const previous = queryClient.getQueryData(["anticipated"]);
            queryClient.setQueryData(["anticipated"], (old: any) =>
                old?.map((item: any) =>
                    item.id === itemId ? { ...item, isTracking: !item.isTracking } : item
                )
            );
            return { previous };
        },
        onError: (err, variables, context) => {
            if (err.message !== "unauth") {
                queryClient.setQueryData(["anticipated"], context?.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["anticipated"] });
        }
    });

    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:p-10 pt-20">
            <SoftGateModal open={showSoftGate} onOpenChange={setShowSoftGate} />

            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                        <Radar className="w-4 h-4" />
                        Beta Lane
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Anticipated Releases</h1>
                    <p className="text-muted-foreground text-lg">
                        Unconfirmed rumors, upcoming launches, and leaks before they become official signals.
                    </p>
                </div>

                {/* Feed Section */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {items.length === 0 ? (
                            <div className="text-center py-20 border border-dashed rounded-xl text-muted-foreground">
                                No anticipated items actively tracked right now.
                            </div>
                        ) : items.map((item, idx) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-card border border-border/60 rounded-xl p-5 hover:border-border transition-colors group"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                                    <div className="space-y-3 flex-1">
                                        {/* Meta Row */}
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${CONFIDENCE_COLORS[item.confidence]}`}>
                                                {item.confidence} Confidence
                                            </span>

                                            {item.firstSeenAt && (
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                                    <CalendarDays className="w-3.5 h-3.5" />
                                                    Tracked: {new Date(item.firstSeenAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                                </div>
                                            )}
                                        </div>

                                        <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h2>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground/80">Context:</span> {item.whyItMatters}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                <span className="font-semibold">Who:</span> {item.whoShouldCare}
                                            </p>
                                        </div>

                                        {/* Evidence Links */}
                                        <div className="pt-2">
                                            <h4 className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-2">Evidence & Discussion</h4>
                                            <div className="flex flex-col gap-2">
                                                {item.evidenceLinks.map((link, i) => (
                                                    <a
                                                        key={i}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-xs text-primary/80 hover:text-primary hover:underline bg-secondary/40 w-fit px-2 py-1.5 rounded"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        {link.title || link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Column */}
                                    <div className="shrink-0 pt-2 sm:pt-0">
                                        <Button
                                            variant={item.isTracking ? "outline" : "default"}
                                            className="w-full sm:w-auto"
                                            onClick={() => trackMutation.mutate(item.id)}
                                        >
                                            {item.isTracking ? "Tracking" : "Track Issue"}
                                            {!item.isTracking && <ArrowRight className="w-4 h-4 ml-2" />}
                                        </Button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
