import { createHash } from "node:crypto";
import type { SourceType } from "@prisma/client";

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    // Keep arxiv ID param, strip everything else
    const isArxiv = u.hostname.includes("arxiv.org");
    if (!isArxiv) {
      u.search = "";
    }
    u.hash = "";
    u.hostname = u.hostname.toLowerCase();
    // Strip trailing slash
    const path = u.pathname.replace(/\/+$/, "");
    u.pathname = path || "/";
    return u.toString();
  } catch {
    return url.toLowerCase().replace(/\/+$/, "");
  }
}

export function canonicalKey(sourceType: SourceType, sourceUrl: string): string {
  const normalized = normalizeUrl(sourceUrl);
  return createHash("sha256").update(`${sourceType}:${normalized}`).digest("hex");
}

export function payloadHash(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}
