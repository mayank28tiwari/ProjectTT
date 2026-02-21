'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { googleNewsApi } from '@/lib/api/googleNews';
import { TokenCard } from '@/components/feed/TokenCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function ItemDetailPage() {
    const { id } = useParams();
    const itemId = Array.isArray(id) ? id[0] : id;

    const { data: item, isLoading } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => googleNewsApi.fetchById(itemId!),
        enabled: !!itemId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <p className="mb-4">Item not found.</p>
                <Link href="/feed"><Button>Back to Feed</Button></Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 flex flex-col items-center pt-20">
            <div className="w-full max-w-lg mb-6">
                <Link href="/feed">
                    <Button variant="ghost" className="-ml-4 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Feed
                    </Button>
                </Link>
            </div>
            <div className="w-full max-w-lg">
                <TokenCard item={item} priority />
            </div>
        </div>
    );
}
