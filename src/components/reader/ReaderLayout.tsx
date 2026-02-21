'use client';

import * as React from "react";
import { TokenItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface ReaderLayoutProps {
    item: TokenItem;
}

export function ReaderLayout({ item }: ReaderLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Top Navigation */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-background/95 backdrop-blur border-b border-border/40">
                <Link href="/feed">
                    <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            <motion.article
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto px-6 py-10"
            >
                {/* Header */}
                <div className="space-y-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {item.domains.map(d => (
                            <Badge key={d} variant="secondary" className="px-2 py-0.5 text-xs font-normal">
                                {d}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground">
                        {item.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{item.sourceName}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
                    </div>
                </div>

                {/* AI Summary Section (Expanded) */}
                <div className="bg-secondary/20 border border-border/60 rounded-xl p-6 mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">AI Intelligence</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground text-sm mb-1">TL;DR</h4>
                            <p className="text-base leading-relaxed text-foreground/90">{item.aiSummary?.tldr || item.shortSummary}</p>
                        </div>

                        {item.aiSummary?.whyItMatters && (
                            <div>
                                <h4 className="font-semibold text-foreground text-sm mb-1">Why it matters</h4>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-foreground/90">
                                    {item.aiSummary.whyItMatters.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fallback Body Content (If API doesn't provide full text, we encourage visiting source) */}
                <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed text-foreground/80 mb-12">
                    <p className="italic text-muted-foreground border-l-4 border-border pl-4">
                        This is a preview of the content. TokenTalks Reader Mode optimizes articles for clarity.
                        For the full interactive experience, please visit the original source.
                    </p>
                </div>

                {/* Primary CTA */}
                <div className="flex justify-center">
                    <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/10">
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                            Read Original Article <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </motion.article>
        </div>
    );
}
