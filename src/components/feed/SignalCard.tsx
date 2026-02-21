'use client';

import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ExternalLink, FileText, Github, Video } from 'lucide-react';
import { Signal, SIGNAL_TYPE_CONFIG, DOMAIN_CONFIG } from '@/types/signal';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SignalCardProps {
    signal: Signal;
    onSave?: (id: string) => void;
}

// Source icons mapping
const SourceIcon = ({ source }: { source: Signal['source'] }) => {
    const iconClasses = "w-4 h-4 text-muted-foreground";

    switch (source) {
        case 'github':
            return <Github className={iconClasses} />;
        case 'hackernews':
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

// Source name mapping
const getSourceName = (source: Signal['source']): string => {
    const names: Record<Signal['source'], string> = {
        github: 'GitHub',
        hackernews: 'Hacker News',
        arxiv: 'arXiv',
        osv: 'OSV',
        manual: 'Manual'
    };
    return names[source];
};

export function SignalCard({ signal, onSave }: SignalCardProps) {
    const typeConfig = SIGNAL_TYPE_CONFIG[signal.signalType];
    const timeAgo = formatDistanceToNow(new Date(signal.publishedAt), { addSuffix: true });

    const hasActions = signal.docsUrl || signal.repoUrl || signal.paperUrl || signal.videoUrl;

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-card border border-border/60 rounded-xl p-4 hover:border-border hover:shadow-sm transition-all"
        >
            {/* Header Row: Signal Badge + Domains + Source + Time */}
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                    {/* Signal Type Badge */}
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
                        typeConfig.bgColor,
                        typeConfig.color
                    )}>
                        {typeConfig.label}
                    </span>

                    {/* Domain Tags */}
                    {signal.domains.slice(0, 2).map(domain => (
                        <span
                            key={domain}
                            className={cn(
                                "text-[10px] font-medium uppercase tracking-wide",
                                DOMAIN_CONFIG[domain].color
                            )}
                        >
                            {DOMAIN_CONFIG[domain].label}
                        </span>
                    ))}
                </div>

                {/* Source + Time */}
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
                    <div className="flex items-center gap-1">
                        <SourceIcon source={signal.source} />
                        <span className="font-medium hidden sm:inline">{getSourceName(signal.source)}</span>
                    </div>
                    <span>•</span>
                    <span>{timeAgo}</span>
                </div>
            </div>

            {/* What Changed - Title */}
            <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {signal.whatChanged}
                </a>
            </h3>

            {/* Why It Matters - Summary */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                {signal.whyItMatters}
            </p>

            {/* Footer: Action Links + Save Button */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40">
                {/* Quick Action Links */}
                <div className="flex items-center gap-1">
                    {signal.docsUrl && (
                        <a
                            href={signal.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Docs
                        </a>
                    )}
                    {signal.repoUrl && (
                        <a
                            href={signal.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                            <Github className="w-3 h-3" />
                            Repo
                        </a>
                    )}
                    {signal.paperUrl && (
                        <a
                            href={signal.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                            <FileText className="w-3 h-3" />
                            Paper
                        </a>
                    )}
                    {signal.videoUrl && (
                        <a
                            href={signal.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                        >
                            <Video className="w-3 h-3" />
                            Video
                        </a>
                    )}
                    {!hasActions && (
                        <span className="text-[10px] text-muted-foreground/50">No additional resources</span>
                    )}
                </div>

                {/* Save Button */}
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
        </motion.article>
    );
}
