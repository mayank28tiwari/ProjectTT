import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json([]);
  }

  try {
    const rows = await prisma.sourceHealth.findMany({
      orderBy: { lastSuccessAt: "desc" },
    });
    return NextResponse.json(rows);
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to fetch health:", error);
    return NextResponse.json({ error: "Failed to fetch health" }, { status: 500 });
  }
}
