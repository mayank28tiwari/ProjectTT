'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, Flame } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const TRENDING_ITEMS = [
    {
        id: "t1",
        title: "Beharry Group partners with Amber Group on new IT cybersecurity company",
        source: "stabroeknews",
        time: "about 18 hours ago",
        tags: ["AI", "Security", "Top"],
        img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        large: true
    },
    {
        id: "t2",
        title: "TikTok's immigration status collection under new privacy policy irks US users",
        source: "geo.tv",
        time: "about 18 hours ago",
        tags: ["Top", "Technology"],
        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
        large: false
    },
    {
        id: "t3",
        title: "Rajinikanth-Shatrughan Sinha film 'Hum Mein Shahenshah' shelved",
        source: "moneycontrol",
        time: "about 12 hours ago",
        tags: ["Entertainment"],
        img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800",
        large: false
    }
];

export function TrendingSection() {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/10 border-b border-border/50">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Flame className="w-5 h-5 text-orange-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Hot Topics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Large Featured Card */}
                    <Link href={`/read/${TRENDING_ITEMS[0].id}`} className="md:col-span-2 lg:col-span-1 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                        <img src={TRENDING_ITEMS[0].img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex gap-2 mb-3">
                                {TRENDING_ITEMS[0].tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/10">{tag}</Badge>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:underline decoration-white/50">{TRENDING_ITEMS[0].title}</h3>
                            <div className="flex items-center gap-2 text-white/60 text-xs">
                                <span className="font-semibold text-white/90">{TRENDING_ITEMS[0].source}</span>
                                <span>•</span>
                                <span>{TRENDING_ITEMS[0].time}</span>
                            </div>
                        </div>
                    </Link>

                    {/* Secondary Cards */}
                    <div className="md:col-span-2 lg:col-span-2 grid md:grid-cols-2 gap-6">
                        {TRENDING_ITEMS.slice(1).map((item) => (
                            <Link key={item.id} href={`/read/${item.id}`} className="group relative rounded-3xl overflow-hidden aspect-[16/10] bg-card border border-border/40">
                                <div className="absolute inset-x-0 top-0 h-2/3">
                                    <img src={item.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 top-1/2 p-5 flex flex-col justify-end bg-gradient-to-t from-card via-card to-transparent pt-12">
                                    <div className="flex gap-1.5 mb-2">
                                        {item.tags.map(tag => (
                                            <Badge key={tag} variant="outline" className="text-[10px] h-5 px-1.5 bg-background/50 backdrop-blur">{tag}</Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
                                        <span className="font-semibold text-foreground/80">{item.source}</span>
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
