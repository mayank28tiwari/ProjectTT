import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { slug } = await params;

  try {
    const signal = await prisma.signal.findUnique({
      where: { slug },
      include: { rawEvent: { select: { payload: true, sourceUrl: true } } },
    });

    if (!signal) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(signal);
  } catch (error) {
    console.error("Failed to fetch signal:", error);
    return NextResponse.json({ error: "Failed to fetch signal" }, { status: 500 });
  }
}
