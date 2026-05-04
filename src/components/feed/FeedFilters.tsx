'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category, CATEGORY_CONFIG } from "@/types/signal";

interface FeedFiltersProps {
    activeCategory: Category | 'all';
    onCategoryChange: (category: Category | 'all') => void;
    className?: string;
}

const CATEGORY_OPTIONS: Array<{ key: Category | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'AI', label: 'AI' },
    { key: 'Web', label: 'Web' },
    { key: 'Backend', label: 'Backend' },
    { key: 'DevOps', label: 'DevOps' },
    { key: 'Security', label: 'Security' },
    { key: 'Cloud', label: 'Cloud' },
    { key: 'Data', label: 'Data' },
    { key: 'Mobile', label: 'Mobile' },
    { key: 'OpenSource', label: 'Open Source' },
    { key: 'Tools', label: 'Tools' },
];

export function FeedFilters({ activeCategory, onCategoryChange, className }: FeedFiltersProps) {
    return (
        <div className={cn("border-b border-border/40", className)}>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-1.5 px-4 py-2 max-w-2xl mx-auto">
                    {CATEGORY_OPTIONS.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => onCategoryChange(key)}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border",
                                activeCategory === key
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
