'use client';

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { googleNewsApi } from "@/lib/api/googleNews";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryShowcaseProps {
    category: string;
    title: string;
    description: string;
}

export function CategoryShowcase({ category, title, description }: CategoryShowcaseProps) {
    const { data: items, isLoading } = useQuery({
        queryKey: ['category', category],
        queryFn: () => googleNewsApi.search(category),
    });

    return (
        <section className="py-16 border-b border-border/40 last:border-0 odd:bg-secondary/20">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-primary rounded-full" />
                            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                        </div>
                        <p className="text-muted-foreground max-w-2xl">{description}</p>
                    </div>
                    <Link href={`/feed?category=${category}`}>
                        <Button variant="ghost" className="group text-primary hover:text-primary hover:bg-primary/10">
                            Explore {title} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Vertical Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-[320px] rounded-2xl" />
                        ))
                    ) : (
                        items?.slice(0, 4).map((item, idx) => (
                            <Link key={item.id} href={`/read/${item.id}`} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-card border border-border/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col group"
                                >
                                    <div className="h-48 bg-muted/30 relative overflow-hidden">
                                        {item.thumbnailUrl ? (
                                            <img
                                                src={item.thumbnailUrl}
                                                alt=""
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-secondary">
                                                <Newspaper className="w-8 h-8 opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-sm text-[10px] font-bold uppercase tracking-wider">
                                                {item.type}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center gap-2 tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            {item.sourceName}
                                        </div>
                                        <h3 className="font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-3 mb-4 flex-1">{item.shortSummary}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
