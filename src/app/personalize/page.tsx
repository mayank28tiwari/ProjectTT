'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { SoftGateModal } from "@/components/auth/SoftGateModal";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, Code, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface StackEntity {
    id: string;
    name: string;
    ecosystem: string;
    version?: string;
}

export default function PersonalizePage() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const [showSoftGate, setShowSoftGate] = React.useState(false);

    // Manual Input State
    const [manualName, setManualName] = React.useState("");
    const [manualEcosystem, setManualEcosystem] = React.useState<"node" | "python" | "cloud" | "other">("node");
    const [isUploading, setIsUploading] = React.useState(false);

    // Fetch existing stack and follows
    const { data: profile } = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            if (!session) return null;
            const res = await fetch("/api/me");
            if (!res.ok) throw new Error("Failed to fetch profile");
            return res.json() as Promise<{ stack: StackEntity[] }>;
        },
        enabled: !!session,
    });

    const stack = profile?.stack || [];

    // Mutations
    const uploadMutation = useMutation({
        mutationFn: async ({ content, filename }: { content: string; filename: string }) => {
            const res = await fetch("/api/stack/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, filename }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Upload failed");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            alert("Stack uploaded successfully!");
        },
        onError: (err: any) => alert(err.message),
        onSettled: () => setIsUploading(false),
    });

    const manualMutation = useMutation({
        mutationFn: async (item: { name: string; ecosystem: string }) => {
            const res = await fetch("/api/stack/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [item] }),
            });
            if (!res.ok) throw new Error("Failed to add item");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            setManualName("");
        },
    });

    // Handlers
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!session) return setShowSoftGate(true);

        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target?.result as string;
            uploadMutation.mutate({ content, filename: file.name });
            // Reset input
            e.target.value = "";
        };
        reader.readAsText(file);
    };

    const handleManualAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return setShowSoftGate(true);
        if (!manualName.trim()) return;

        manualMutation.mutate({ name: manualName.trim(), ecosystem: manualEcosystem });
    };

    return (
        <div className="min-h-screen bg-background p-6 pt-20 flex justify-center">
            <SoftGateModal open={showSoftGate} onOpenChange={setShowSoftGate} />

            <div className="w-full max-w-lg space-y-10">
                <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                    <Link href="/feed">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Your Stack</h1>
                        <p className="text-sm text-muted-foreground pt-1">
                            Declare your tech stack to get personalized "My Signals".
                        </p>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        Quick Import
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Upload a <code className="bg-muted px-1 py-0.5 rounded">package.json</code> or <code className="bg-muted px-1 py-0.5 rounded">requirements.txt</code> to instantly sync your dependencies.
                    </p>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="secondary"
                            className="relative overflow-hidden cursor-pointer"
                            disabled={isUploading}
                        >
                            {isUploading ? "Reading file..." : "Choose File"}
                            <input
                                type="file"
                                accept=".json,.txt"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileUpload}
                            />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                            We don't store your file, only the parsed library names.
                        </span>
                    </div>
                </div>

                {/* Manual Section */}
                <div className="space-y-4 pt-4 border-t border-border/50">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Manual Entry
                    </h2>

                    <form onSubmit={handleManualAdd} className="flex gap-2">
                        <select
                            className="bg-background border rounded-md px-3 py-2 text-sm"
                            value={manualEcosystem}
                            onChange={(e) => setManualEcosystem(e.target.value as any)}
                        >
                            <option value="node">Node/JS</option>
                            <option value="python">Python</option>
                            <option value="cloud">Cloud</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            className="flex-1 bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. react, fastapi, aws..."
                            value={manualName}
                            onChange={(e) => setManualName(e.target.value)}
                        />
                        <Button type="submit" disabled={manualMutation.isPending || !manualName.trim()}>
                            Add
                        </Button>
                    </form>
                </div>

                {/* Current Stack Display */}
                <div className="space-y-4 pt-4 border-t border-border/50">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        Currently Tracking ({stack.length})
                    </h2>

                    {!session ? (
                        <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed">
                            <p className="text-sm text-muted-foreground mb-4">You must be logged in to save your stack.</p>
                            <Button onClick={() => setShowSoftGate(true)}>Sign In</Button>
                        </div>
                    ) : stack.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic py-4">
                            You aren't tracking any technologies yet. Add some above!
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {stack.map((entity) => (
                                <Badge key={entity.id} variant="secondary" className="px-3 py-1.5 text-sm gap-1.5 items-center">
                                    <span className="opacity-70 text-xs w-4 h-4 rounded bg-background flex items-center justify-center font-mono">
                                        {entity.ecosystem[0].toUpperCase()}
                                    </span>
                                    {entity.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
