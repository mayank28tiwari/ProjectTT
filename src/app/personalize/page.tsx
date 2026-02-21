'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useSession } from "next-auth/react";
import { SoftGateModal } from "@/components/auth/SoftGateModal";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const DOMAINS = ["AI", "Web", "Mobile", "DevOps", "Security", "Data", "Cloud", "Backend", "OSS"];
const TYPES = ["News", "Research", "Video", "Blog", "Release"];

export default function PersonalizePage() {
    const { data: session } = useSession();
    const [selectedDomains, setSelectedDomains] = React.useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [showSoftGate, setShowSoftGate] = React.useState(false);
    const [signalIntensity, setSignalIntensity] = React.useState([50]);

    const toggleSelection = (item: string, list: string[], setList: any) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleSave = () => {
        if (!session) {
            setShowSoftGate(true);
        } else {
            // Verify / Save logic would go here
            alert("Preferences saved!");
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 pt-20 flex justify-center">
            <SoftGateModal open={showSoftGate} onOpenChange={setShowSoftGate} />

            <div className="w-full max-w-lg space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/feed">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Personalize Feed</h1>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Interests</h2>
                    <p className="text-sm text-muted-foreground">Select the domains you want to see more of.</p>
                    <div className="flex flex-wrap gap-2">
                        {DOMAINS.map(d => (
                            <Badge
                                key={d}
                                variant={selectedDomains.includes(d) ? "default" : "outline"}
                                className="text-sm py-1.5 px-3 cursor-pointer select-none hover:bg-primary/90"
                                onClick={() => toggleSelection(d, selectedDomains, setSelectedDomains)}
                            >
                                {d}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Content Types</h2>
                    <div className="flex flex-wrap gap-2">
                        {TYPES.map(t => (
                            <Badge
                                key={t}
                                variant={selectedTypes.includes(t) ? "default" : "outline"}
                                className="text-sm py-1.5 px-3 cursor-pointer select-none"
                                onClick={() => toggleSelection(t, selectedTypes, setSelectedTypes)}
                            >
                                {t}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Signal Intensity</h2>
                        <span className="text-sm text-muted-foreground">
                            {signalIntensity[0] > 70 ? "Top Signal Only" : signalIntensity[0] < 30 ? "Everything" : "Balanced"}
                        </span>
                    </div>
                    <Slider
                        value={signalIntensity}
                        onValueChange={setSignalIntensity}
                        max={100}
                        step={10}
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        Higher intensity filters out noise and shows only high-relevance items.
                    </p>
                </div>

                <div className="pt-8">
                    <Button size="lg" className="w-full rounded-2xl h-12 text-base" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                    </Button>
                </div>
            </div>
        </div>
    );
}
