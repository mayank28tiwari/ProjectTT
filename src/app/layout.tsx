import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TokenTalks — Know before it breaks.",
  description: "Developer signal intelligence: releases, advisories, papers — curated and enriched.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}>
        <Providers>
          <header className="border-b border-zinc-800">
            <div className="mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold text-lg tracking-tight text-zinc-100">
                TokenTalks
              </Link>
              <nav>
                <Link href="/feed" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                  Feed
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-[1200px] px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
