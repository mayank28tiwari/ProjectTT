'use client';

import { motion } from "framer-motion";
import { Zap, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BREAKING = [
    { title: "OpenAI releases GPT-5 preview", source: "OpenAI", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=50" },
    { title: "React 19 introduces new optimistic updates API", source: "React", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=50" },
    { title: "K8s v1.30 deprecates PodSecurityPolicy", source: "Kubernetes", img: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?w=50" },
    { title: "Apple announces Vision Pro 2", source: "Apple", img: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?w=50" },
    { title: "Tailwind CSS v4 simplifies configuration", source: "CSS", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=50" },
];

export function NewsTicker() {
    return (
        <div className="bg-background border-y border-border/50 h-14 flex items-center relative overflow-hidden group">
            {/* Label */}
            <div className="pl-4 pr-6 h-full font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-2 shrink-0 z-20 bg-background border-r border-border/40 shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
                <Zap className="w-4 h-4 fill-primary animate-pulse" />
                Trending
            </div>

            {/* Scrolling Content */}
            <div className="flex overflow-hidden mask-linear-fade flex-1">
                <motion.div
                    className="flex gap-8 whitespace-nowrap pl-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                >
                    {[...BREAKING, ...BREAKING, ...BREAKING].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 group/item cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-md bg-muted overflow-hidden shrink-0">
                                <img src={item.img} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-semibold text-foreground/90 leading-none">{item.title}</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-medium mt-0.5">{item.source}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right CTA */}
            <div className="absolute right-0 top-0 bottom-0 z-20 pl-12 pr-4 bg-gradient-to-l from-background via-background/90 to-transparent flex items-center">
                <Link href="/feed">
                    <Button variant="ghost" size="sm" className="gap-2 text-xs font-semibold h-8 rounded-full bg-secondary/50 hover:bg-secondary border border-border/50">
                        Explore More <ArrowRight className="w-3 h-3" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
