'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const MOCK_FEED = [
    { title: "OpenAI announces GPT-5 Preview", source: "The Verge", time: "2h ago", tag: "AI", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300" },
    { title: "React 19 release candidate is out now", source: "React Blog", time: "4h ago", tag: "Web", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300" },
    { title: "Apple Vision Pro 2 rumors heat up", source: "MacRumors", time: "6h ago", tag: "Tech", img: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=300" },
    { title: "Kubernetes removes PodSecurityPolicy", source: "CNCF", time: "12h ago", tag: "DevOps", img: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?auto=format&fit=crop&q=80&w=300" },
];

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden px-4 pt-20">

            {/* Background Depth/Grid */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_100%)] z-0 pointer-events-none" />
            <div className="absolute inset-0 -z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />

            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <motion.div
                style={{ y, opacity }}
                className="text-center max-w-4xl space-y-8 z-10 flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 text-sm font-medium text-secondary-foreground backdrop-blur-md shadow-sm hover:bg-secondary transition-colors cursor-default"
                >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Introducing Vision AI Summaries</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground"
                >
                    Tech in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">bytes</span>. <br />
                    <span className="text-muted-foreground font-semibold text-5xl md:text-7xl">Depth on demand.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
                >
                    A single intelligent feed for AI, DevOps, Cloud, and Engineering.
                    <br className="hidden sm:block" />
                    Curated, summarized, and ready for your morning coffee.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                    <Link href="/feed">
                        <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground border-0">
                            Explore Feed <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/personalize">
                        <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg bg-background/50 backdrop-blur-sm hover:bg-secondary/80 border-border/60">
                            Personalize
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* 3D-effect Mock Preview */}
            <motion.div
                initial={{ opacity: 0, rotateX: 20, y: 100 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 50 }}
                className="mt-20 relative w-full max-w-5xl h-[500px] perspective-[2000px] z-0"
            >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[360px] md:w-[420px] h-[700px] bg-background border border-border/40 rounded-t-[3.5rem] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.05)] overflow-hidden ring-1 ring-white/20 dark:ring-white/5">
                    {/* Mock Header */}
                    <div className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6">
                        <div className="w-20 h-4 bg-muted/50 rounded-full" />
                        <div className="w-8 h-8 rounded-full bg-muted/50" />
                    </div>

                    {/* Mock Content Gradient */}
                    <div className="w-full h-full bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
                        {/* Infinite Scroll List */}
                        <div className="mask-gradient-b absolute inset-0 overflow-hidden">
                            <motion.div
                                className="flex flex-col gap-3 p-4"
                                animate={{ y: [0, -600] }} // Adjust based on height of content
                                transition={{ repeat: Infinity, duration: 25, ease: "linear", repeatType: "loop" }}
                            >
                                {/* Duplicated list for infinite scroll seamless loop */}
                                {[...MOCK_FEED, ...MOCK_FEED].map((item, idx) => (
                                    <div key={idx} className="w-full bg-card rounded-xl shadow-sm border border-border/40 overflow-hidden flex flex-col shrink-0">
                                        <div className="h-28 w-full relative bg-muted">
                                            <img src={item.img} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[8px] font-bold text-white uppercase">
                                                {item.tag}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <div className="w-3 h-3 rounded-full bg-primary/20" />
                                                <span className="text-[9px] text-muted-foreground font-medium">{item.source}</span>
                                                <span className="text-[9px] text-muted-foreground">• {item.time}</span>
                                            </div>
                                            <h4 className="text-xs font-bold leading-snug line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Overlay Gradient for Fade effect */}
                        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/90 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
