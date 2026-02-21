'use client';

import { motion } from "framer-motion";
import { Zap, Layers, FileText, Video, Newspaper, Code2, Shield, Brain, Cpu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Features() {
    return (
        <section className="py-32 relative bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Why TokenTalks?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The tech world moves too fast for traditional media. We built a feed that keeps up, filtering the signal from the noise.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {/* Feature 1: Main Value Prop - Large */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 row-span-2 rounded-3xl bg-secondary/20 border border-border/50 p-8 flex flex-col justify-between overflow-hidden relative group"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Zero Clutter. Pure Signal.</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                No ads, no popups, no SEO-spam. Just the essential tech news you need, summarized to the core byte.
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>

                    {/* Feature 2: AI Summaries */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="rounded-3xl bg-card border border-border/50 p-8 flex flex-col relative overflow-hidden"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500">
                            <Brain className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">AI-Powered Depth</h3>
                        <p className="text-muted-foreground">Research papers and hour-long videos distilled into key takeaways.</p>
                    </motion.div>

                    {/* Feature 3: Coverage */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl bg-card border border-border/50 p-8 flex flex-col relative overflow-hidden"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">All Domains</h3>
                        <p className="text-muted-foreground">From React releases to Kubernetes updates, LLM benchmarks to Security CVEs.</p>
                    </motion.div>

                    {/* Feature 4: Wide Span - Content Types */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-3 rounded-3xl bg-gradient-to-r from-secondary/30 to-background border border-border/50 p-8 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="max-w-md">
                            <h3 className="text-2xl font-bold mb-2">Everything in one place</h3>
                            <p className="text-muted-foreground">Stop tab switching. Get your daily dose of diverse tech content here.</p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {[
                                { label: "News", icon: Newspaper, color: "text-blue-500" },
                                { label: "Research", icon: FileText, color: "text-green-500" },
                                { label: "Videos", icon: Video, color: "text-red-500" },
                                { label: "Releases", icon: Code2, color: "text-amber-500" },
                                { label: "Security", icon: Shield, color: "text-indigo-500" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background border border-border shadow-sm hover:scale-105 transition-transform">
                                    <item.icon className={cn("w-4 h-4", item.color)} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
