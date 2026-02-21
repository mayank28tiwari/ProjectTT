// ... component code
import * as React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
    Share2, Bookmark, MoreHorizontal, ExternalLink,
    PlayCircle, FileText, Code2, Newspaper, BookOpen, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TokenItem, TokenTokenType } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SoftGateModal } from "@/components/auth/SoftGateModal";
import Image from "next/image";

interface TokenCardProps {
    item: TokenItem;
    priority?: boolean;
}

const TypeIcon = ({ type }: { type: TokenTokenType }) => {
    switch (type) {
        case 'video': return <PlayCircle className="w-3.5 h-3.5" />;
        case 'research': return <FileText className="w-3.5 h-3.5" />;
        case 'release': return <Code2 className="w-3.5 h-3.5" />;
        case 'blog': return <BookOpen className="w-3.5 h-3.5" />;
        default: return <Newspaper className="w-3.5 h-3.5" />;
    }
};

export function TokenCard({ item, priority = false }: TokenCardProps) {
    const isResearchOrVideo = item.type === 'research' || item.type === 'video';
    const { data: session } = useSession();
    const [showSoftGate, setShowSoftGate] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!session) {
            setShowSoftGate(true);
        } else {
            setIsSaved(!isSaved);
            // TODO: Persist to backend
        }
    };

    return (
        <>
            <SoftGateModal open={showSoftGate} onOpenChange={setShowSoftGate} />
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative w-full bg-card border border-border/40 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 isolate flex flex-col"
            >
                {/* Visual Header / Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-muted/30 overflow-hidden">
                    {item.thumbnailUrl ? (
                        <div className="relative w-full h-full">
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient Overlay for Text Readability if needed, mostly for bottom overlap */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                            <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {priority && (
                            <Badge variant="secondary" className="backdrop-blur-md bg-white/90 dark:bg-black/60 text-foreground border-white/20 shadow-sm px-2 py-0.5 text-[10px] font-semibold">
                                ★ Top Signal
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Meta Row */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5 border border-border/50">
                                <AvatarImage src={`https://logo.clearbit.com/${new URL(item.url).hostname}`} />
                                <AvatarFallback className="text-[8px]">{item.sourceName.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-muted-foreground">{item.sourceName}</span>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/50 border border-border/50">
                            <TypeIcon type={item.type} />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{item.type}</span>
                        </div>
                    </div>

                    {/* Title & Summary */}
                    <Link href={`/read/${item.id}`} className="block group/link space-y-2">
                        <h2 className="text-lg md:text-xl font-bold leading-tight tracking-tight text-foreground group-hover/link:text-primary transition-colors">
                            {item.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {item.shortSummary}
                        </p>
                    </Link>

                    {/* AI Summary Block - Refined */}
                    {isResearchOrVideo && item.aiSummary && (
                        <div className="mt-2 p-3.5 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border/60">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">AI Bytes</span>
                            </div>
                            <p className="text-xs font-medium text-foreground/90 italic border-l-2 border-indigo-500/30 pl-2.5">
                                "{item.aiSummary.tldr}"
                            </p>
                        </div>
                    )}

                    {/* Tags Scroll */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 mt-1 no-scrollbar mask-linear-fade">
                        {item.domains.map((domain) => (
                            <Badge key={domain} variant="outline" className="text-[10px] px-2.5 py-0.5 h-6 font-medium bg-background hover:bg-secondary transition-colors whitespace-nowrap">
                                {domain}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 pb-5 pt-0 mt-auto">
                    <div className="flex items-center justify-between border-t border-border/40 pt-3">
                        <Link href={`/read/${item.id}`}>
                            <Button variant="link" className="h-auto p-0 text-xs font-semibold text-primary hover:no-underline hover:opacity-80">
                                Read Deep Dive <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                        </Link>

                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all", isSaved ? "text-primary bg-primary/10" : "text-muted-foreground")}
                                onClick={handleSave}
                            >
                                <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
