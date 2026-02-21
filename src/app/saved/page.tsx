'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TokenCard } from "@/components/feed/TokenCard";
import { TokenItem } from "@/lib/types";

// Mock saved Items for display since we don't have a real backend persisting it yet
// In real app, fetch from API
const MOCK_SAVED: TokenItem[] = [
    {
        id: 'mock-1',
        title: 'OpenAI Releases GPT-5 with Enhanced Reasoning',
        shortSummary: 'OpenAI has officially unveiled GPT-5, featuring advanced reasoning capabilities and a 128k context window standard across all models.',
        url: 'https://openai.com/blog',
        sourceName: 'OpenAI Blog',
        publishedAt: new Date().toISOString(),
        type: 'release',
        domains: ['AI', 'Models'],
        tags: ['GPT-5', 'LLM', 'AI Safety'],
        aiSummary: {
            tldr: 'GPT-5 launches with better reasoning.',
            whyItMatters: ['Sets new benchmark for LLMs', 'Reduces hallucination rates'],
            whoItsFor: 'AI Developers & Researchers',
            prerequisites: ['Basic LLM knowledge']
        }
    }
];

export default function SavedPage() {
    return (
        <div className="min-h-screen bg-background p-6 pt-20 flex flex-col items-center">
            <div className="w-full max-w-lg mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/feed">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Saved Items</h1>
                </div>

                <div className="space-y-6">
                    {MOCK_SAVED.length > 0 ? (
                        MOCK_SAVED.map(item => (
                            <TokenCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">
                            No saved items yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
