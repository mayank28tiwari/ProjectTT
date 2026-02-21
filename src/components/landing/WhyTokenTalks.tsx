'use client';

import { motion } from "framer-motion";
import { Zap, Shield, Database, Clock } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Signal-First",
        description: "Not news. Technical changes that matter to builders.",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        icon: Shield,
        title: "No Algorithm",
        description: "Pure chronological feed. You decide what matters.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        icon: Database,
        title: "50+ Sources",
        description: "GitHub, arXiv, OSV, Hacker News and more.",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: Clock,
        title: "Offline Ready",
        description: "Save signals and read anywhere, anytime.",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
];

export function WhyTokenTalks() {
    return (
        <section className="py-16 md:py-20 bg-background">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        Why <span className="text-primary">TokenTalks?</span>
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        The real-time diff of the tech ecosystem, built for engineers.
                    </p>
                </motion.div>

                {/* Feature Grid - Compact 2x2 on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-5 bg-card rounded-xl border border-border/50 hover:border-border transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2.5 rounded-lg ${feature.bg} shrink-0`}>
                                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                                    <p className="text-muted-foreground text-xs leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tagline Bar - Clean and subtle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-muted-foreground">
                        Trusted by <span className="font-semibold text-foreground">10,000+</span> engineers worldwide
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
