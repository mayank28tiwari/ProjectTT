'use client';

import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ExternalLink, FileText, Github, Video } from 'lucide-react';
import { Signal, IMPACT_LABEL_CONFIG, CATEGORY_CONFIG, SOURCE_TYPE_CONFIG } from '@/types/signal';
import type { SourceType } from '@/types/signal';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface UISignal extends Signal {
    isSaved?: boolean;
    rankingTags?: string[];
}

interface SignalCardProps {
    signal: UISignal;
    onSave?: (id: string) => void;
}

// Source icons mapping
const SourceIcon = ({ sourceType }: { sourceType: SourceType }) => {
    const iconClasses = "w-4 h-4 text-muted-foreground";

    switch (sourceType) {
        case 'github':
            return <Github className={iconClasses} />;
        case 'hn':
            return (
                <div className={cn(iconClasses, "flex items-center justify-center font-bold text-[10px] text-orange-500")}>
                    Y
                </div>
            );
        case 'arxiv':
            return (
                <div className={cn(iconClasses, "flex items-center justify-center font-mono text-[10px] text-red-500")}>
                    arX
                </div>
            );
        case 'osv':
            return (
                <div className={cn(iconClasses, "flex items-center justify-center font-bold text-[10px] text-amber-500")}>
                    OSV
                </div>
            );
        default:
            return <FileText className={iconClasses} />;
    }
};

export function SignalCard({ signal, onSave }: SignalCardProps) {
    const impactConfig = IMPACT_LABEL_CONFIG[signal.impactLabel];
    const categoryConfig = CATEGORY_CONFIG[signal.category];
    const timeAgo = formatDistanceToNow(new Date(signal.publishedAt), { addSuffix: true });

    const primaryCitation = signal.citations[0];

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-card border border-border/60 rounded-xl p-4 hover:border-border hover:shadow-sm transition-all"
        >
            {/* Header Row: Impact Badge + Category + Source + Time */}
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                    {/* Impact Label Badge */}
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
                        impactConfig.bgColor,
                        impactConfig.color
                    )}>
                        {impactConfig.label}
                    </span>

                    {/* Category Tag */}
                    <span className={cn(
                        "text-[10px] font-medium uppercase tracking-wide",
                        categoryConfig.color
                    )}>
                        {categoryConfig.label}
                    </span>

                    {/* Ranking Tags (M7 Personalization) */}
                    {signal.rankingTags && signal.rankingTags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Source + Time */}
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
                    <div className="flex items-center gap-1">
                        <SourceIcon sourceType={signal.sourceType} />
                        <span className="font-medium hidden sm:inline">{signal.sourceName}</span>
                    </div>
                    <span>•</span>
                    <span>{timeAgo}</span>
                </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {signal.title}
                </a>
            </h3>

            {/* Summary */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                {signal.summary}
            </p>

            {/* Why It Matters */}
            <div className="mb-2 px-2.5 py-1.5 rounded-lg bg-secondary/40 border-l-2 border-primary/30">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70 block mb-0.5">
                    Why it matters
                </span>
                <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                    {signal.whyItMatters}
                </p>
            </div>

            {/* Who Should Care */}
            <p className="text-[11px] text-muted-foreground mb-3">
                <span className="font-medium">Who should care:</span>{' '}
                {signal.whoShouldCare}
            </p>

            {/* Footer: Citation Link + Save Button */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40">
                {/* Citation / Source Link */}
                <div className="flex items-center gap-1">
                    {primaryCitation && (
                        <a
                            href={primaryCitation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                            <ExternalLink className="w-3 h-3" />
                            {primaryCitation.title || 'Source'}
                        </a>
                    )}
                    {signal.citations.length > 1 && (
                        <span className="text-[10px] text-muted-foreground/60">
                            +{signal.citations.length - 1} more
                        </span>
                    )}
                </div>

                {/* Save & Share Buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-7 px-2 gap-1 text-[10px] text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                    >
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${signal.title}\n\n💡 ${signal.whyItMatters.substring(0, 90)}...\n\n#${signal.category} #TokenTalks`)}&url=${encodeURIComponent(signal.sourceUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Share
                        </a>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSave?.(signal.id)}
                        className={cn(
                            "h-7 px-2 gap-1 text-[10px]",
                            signal.isSaved && "text-primary"
                        )}
                    >
                        {signal.isSaved ? (
                            <>
                                <BookmarkCheck className="w-3.5 h-3.5" />
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark className="w-3.5 h-3.5" />
                                Save
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </motion.article>
    );
}
