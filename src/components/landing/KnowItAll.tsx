'use client';

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FEEDS = {
    AI: [
        { title: "The rise of Agentic AI workflows in 2025", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200", time: "2h ago" },
        { title: "DeepMind solves protein folding at scale", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200", time: "4h ago" },
        { title: "Local LLMs vs Cloud: The privacy debate", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200", time: "6h ago" },
    ],
    Security: [
        { title: "Zero-Day vulnerability found in major router firmware", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200", time: "1h ago" },
        { title: "NIST releases new post-quantum cryptography standards", img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=200", time: "3h ago" },
        { title: "Phishing attacks use AI voice cloning", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200", time: "5h ago" },
    ],
    Data: [
        { title: "Modern Data Stack is dead, long live the Streaming Stack", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200", time: "2h ago" },
        { title: "Graph Databases gain traction for RAG apps", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=200", time: "8h ago" },
        { title: "Snowflake vs Databricks: The collision course", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200", time: "12h ago" },
    ]
};

export function KnowItAll() {
    return (
        <section className="py-20 bg-background border-b border-border/40">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">Know It All...</h2>
                    <Link href="/feed">
                        <Button variant="outline" className="hidden sm:flex rounded-full px-6">
                            Explore more <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Columns */}
                    {Object.entries(FEEDS).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-6">
                            {/* Pill Header */}
                            <div className="self-center md:self-start">
                                <div className="px-4 py-1.5 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-sm font-semibold text-secondary-foreground shadow-sm">
                                    {category === "AI" ? "Artificial Intelligence" : category === "Security" ? "Cybersecurity" : "Data Engineering"}
                                </div>
                            </div>

                            {/* Cards List */}
                            <div className="flex flex-col gap-4 bg-muted/20 p-4 rounded-3xl border border-border/40 h-full">
                                {items.map((item, i) => (
                                    <div key={i} className="bg-card p-3 rounded-2xl border border-border/40 shadow-sm flex gap-3 hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="w-16 h-16 rounded-xl bg-muted shrink-0 overflow-hidden">
                                            <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-sm font-bold leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-auto pt-2 text-center">
                                    <div className="flex gap-1 justify-center">
                                        <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                        <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                        <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link href="/feed">
                    <Button variant="outline" className="w-full mt-8 sm:hidden rounded-full">
                        Explore more <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
