import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // Placeholder mock response
    return NextResponse.json({
        title: 'Extracted Content Title',
        content: '<h1>Mock Extracted Content</h1><p>This is where the extracted article content would appear.</p>',
        textContent: 'Mock Extracted Content. This is where the extracted article content would appear.',
        byline: 'Author Name',
        excerpt: 'Short excerpt...'
    });
}
