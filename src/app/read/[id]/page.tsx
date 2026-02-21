'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { googleNewsApi } from '@/lib/api/googleNews';
import { ReaderLayout } from '@/components/reader/ReaderLayout';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReadPage() {
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
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-xl font-bold mb-2">Item not found</h1>
                <p className="text-muted-foreground mb-4">The item you are looking for might have expired or does not exist.</p>
                <Link href="/feed">
                    <Button>Back to Feed</Button>
                </Link>
            </div>
        );
    }

    return <ReaderLayout item={item} />;
}
