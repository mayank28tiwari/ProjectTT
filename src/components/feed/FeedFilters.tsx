'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Domain, DOMAIN_CONFIG } from "@/types/signal";

interface FeedFiltersProps {
    activeDomain: Domain | 'all';
    onDomainChange: (domain: Domain | 'all') => void;
    className?: string;
}

const DOMAIN_OPTIONS: Array<{ key: Domain | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'ai', label: 'AI' },
    { key: 'web', label: 'Web' },
    { key: 'devops', label: 'DevOps' },
    { key: 'security', label: 'Security' },
    { key: 'cloud', label: 'Cloud' },
    { key: 'data', label: 'Data' },
    { key: 'mobile', label: 'Mobile' },
];

export function FeedFilters({ activeDomain, onDomainChange, className }: FeedFiltersProps) {
    return (
        <div className={cn("border-b border-border/40", className)}>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-1.5 px-4 py-2 max-w-2xl mx-auto">
                    {DOMAIN_OPTIONS.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => onDomainChange(key)}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border",
                                activeDomain === key
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
        </div>
    );
}
