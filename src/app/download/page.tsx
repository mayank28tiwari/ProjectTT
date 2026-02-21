'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Apple, Smartphone } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12 px-6 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl space-y-8"
                >
                    <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                        <Smartphone className="w-10 h-10 text-primary" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Experience TokenTalks on Mobile
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The fastest way to consume tech knowledge. Now available on iOS and Android with offline mode and push notifications.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        {/* Mock App Store Button */}
                        <button className="flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl hover:opacity-80 transition-opacity">
                            <Apple className="w-8 h-8" />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase font-medium">Download on the</span>
                                <span className="text-xl font-bold">App Store</span>
                            </div>
                        </button>

                        {/* Mock Play Store Button */}
                        <button className="flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl hover:opacity-80 transition-opacity">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.36,13.08L18.65,14.06L15.42,10.83L18.65,7.6L20.36,8.58C20.87,8.87 21.19,9.41 21.19,10C21.19,10.59 20.87,11.13 20.36,11.42M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                            </svg>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase font-medium">Get it on</span>
                                <span className="text-xl font-bold">Google Play</span>
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left max-w-4xl mx-auto">
                        {[
                            "Native performance (60fps)",
                            "Offline reading mode",
                            "Smart push notifications",
                            "Widget support",
                            "Dark mode OLED optimized",
                            "Biometric lock"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-secondary/20">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
