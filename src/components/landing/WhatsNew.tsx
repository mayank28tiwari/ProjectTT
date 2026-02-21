'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NEWS_ITEMS = [
    {
        id: "1",
        title: "Beharry Group partners with Amber Group on new IT cybersecurity company",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        summary: "Guyana's Beharry Group and Jamaica's Amber Group have formally entered into a strategic joint venture that will see the establishment of a new IT and cybersecurity company.",
        source: "Stabroek News",
        time: "18h ago"
    },
    {
        id: "2",
        title: "TikTok's immigration status collection under new privacy policy irks US users",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
        summary: "New privacy policy updates have raised concerns among users regarding data collection practices related to immigration status.",
        source: "Geo TV",
        time: "18h ago"
    },
    {
        id: "3",
        title: "OpenAI releases GPT-5 Preview with enhanced reasoning capabilities",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        summary: "The latest model demonstrates significant improvements in complex problem solving and coding tasks.",
        source: "The Verge",
        time: "2h ago"
    },
    {
        id: "4",
        title: "Apple Vision Pro 2 rumors suggest lighter design and lower price point",
        image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=800",
        summary: "Supply chain leaks indicate Apple is targeting a mass-market release for its next spatial computer.",
        source: "MacRumors",
        time: "6h ago"
    }
];

export function WhatsNew() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-rotate unless hovered
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const activeItem = NEWS_ITEMS[activeIndex];

    return (
        <section className="py-16 bg-background">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">What's New</h2>
                    <Flame className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Active Thumbnail Card */}
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[450px] w-full rounded-3xl overflow-hidden bg-muted group cursor-pointer shadow-lg border border-border/40">
                        <Link href={`/read/${activeItem.id}`} className="absolute inset-0">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeItem.image}
                                    src={activeItem.image}
                                    alt=""
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <motion.div
                                    key={activeItem.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{activeItem.title}</h3>
                                    <div className="flex items-center gap-3 text-white/70 text-sm">
                                        <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white font-medium">{activeItem.source}</span>
                                        <span>•</span>
                                        <span>{activeItem.time}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </Link>
                    </div>

                    {/* Right: Text List */}
                    <div
                        className="flex flex-col justify-center gap-4"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {NEWS_ITEMS.map((item, idx) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-l-4 ${idx === activeIndex
                                        ? "bg-secondary/30 border-primary shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-secondary/10 hover:border-border"
                                    }`}
                            >
                                <h4 className={`text-lg font-bold leading-snug mb-2 ${idx === activeIndex ? "text-foreground" : "text-muted-foreground"}`}>
                                    {item.title}
                                </h4>
                                <AnimatePresence>
                                    {idx === activeIndex && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-muted-foreground line-clamp-2 pb-2">
                                                {item.summary}
                                            </p>
                                            <Link href={`/read/${item.id}`} className="inline-flex items-center text-xs font-semibold text-primary hover:underline mt-1">
                                                Read Now <ArrowRight className="w-3 h-3 ml-1" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
