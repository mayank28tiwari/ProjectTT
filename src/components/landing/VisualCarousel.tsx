'use client';

import { motion } from "framer-motion";

export function VisualCarousel() {
    return (
        <section className="py-12 overflow-hidden bg-background border-b border-border/40 relative">
            {/* Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

            <div className="flex">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                    {[...Array(2)].map((_, setIndex) => (
                        <div key={setIndex} className="flex gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-[280px] h-[160px] md:w-[320px] md:h-[180px] bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden opacity-80 hover:opacity-100 transition-opacity transform hover:scale-105 duration-300">
                                    <div className={`h-full w-full bg-gradient-to-br ${i % 3 === 0 ? 'from-blue-500/10 to-purple-500/10' :
                                            i % 3 === 1 ? 'from-green-500/10 to-emerald-500/10' :
                                                'from-orange-500/10 to-red-500/10'
                                        } p-4 relative`}>
                                        {/* Abstract Shapes/Lines for visual noise */}
                                        <div className="w-16 h-16 rounded-full bg-foreground/5 absolute -top-4 -right-4" />
                                        <div className="w-1/2 h-2 bg-foreground/5 rounded-full mb-2" />
                                        <div className="w-3/4 h-2 bg-foreground/5 rounded-full mb-2" />
                                        <div className="w-1/3 h-2 bg-foreground/5 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
