import { KNOWN_ENTITIES } from "./entities";

const COMPILED: { canonical: string; patterns: RegExp[] }[] = KNOWN_ENTITIES.map((e) => ({
  canonical: e.canonical,
  patterns: [e.canonical, ...e.aliases].map(
    (term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"),
  ),
}));

export function extractEntities(text: string, knownEntities?: string[]): string[] {
  const found = new Set<string>(knownEntities ?? []);

  for (const { canonical, patterns } of COMPILED) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        found.add(canonical);
        break;
      }
    }
  }

  return Array.from(found);
}
