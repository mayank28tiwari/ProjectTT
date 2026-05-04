import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateTweetIntent } from "@/lib/share/tweet";

// GET /api/share/tweet?signalId=...
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const signalId = url.searchParams.get("signalId");

    if (!signalId) {
        return NextResponse.json({ error: "signalId is required" }, { status: 400 });
    }

    try {
        const signal = await prisma.signal.findUnique({
            where: { id: signalId },
        });

        if (!signal) {
            return NextResponse.json({ error: "Signal not found" }, { status: 404 });
        }

        // Generate the Twitter Intent URL using our M9 library function
        const appUrl = process.env.NEXTAUTH_URL || "https://tokentalks.dev";
        const intentUrl = generateTweetIntent(signal as any, appUrl);

        // Redirect directly to the Twitter intent window
        return NextResponse.redirect(intentUrl);

    } catch (e) {
        console.error("Failed to generate share link:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
