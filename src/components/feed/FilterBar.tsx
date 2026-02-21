'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock, TrendingUp, Bookmark } from "lucide-react";

interface FilterBarProps {
    className?: string;
}

const DOMAINS = ["All", "AI", "Web", "Mobile", "DevOps", "Security", "Data", "Cloud", "Backend", "OSS"];
const TYPES = ["News", "Research", "Video", "Blog", "Release"];

export function FilterBar({ className }: FilterBarProps) {
    const [activeDomain, setActiveDomain] = React.useState("All");
    const [activeType, setActiveType] = React.useState<string | null>(null);

    return (
        <div className={cn("sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50 transition-all", className)}>
            <div className="flex flex-col gap-2 py-2">
                {/* Top Row: Domains */}
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-2 px-4 pb-2">
                        {DOMAINS.map((domain) => (
                            <button
                                key={domain}
                                onClick={() => setActiveDomain(domain)}
                                className={cn(
                                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                                    activeDomain === domain
                                        ? "bg-foreground text-background border-foreground shadow-sm"
                                        : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>

                {/* Bottom Row: Types & Sort (Optional, can be cleaner) */}
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-2 px-4 pb-2 items-center">
                        <span className="text-xs font-semibold text-muted-foreground mr-1">Type:</span>
                        {TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveType(activeType === type ? null : type)}
                                className={cn(
                                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                                    activeType === type
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-background border-border text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                {type}
                            </button>
                        ))}

                        <div className="h-4 w-px bg-border mx-2" />

                        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:bg-secondary/50 transition-colors">
                            <Clock className="w-3 h-3" /> Latest
                        </button>
                        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:bg-secondary/50 transition-colors">
                            <TrendingUp className="w-3 h-3" /> Trending
                        </button>
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </div>
        </div>
    );
}
