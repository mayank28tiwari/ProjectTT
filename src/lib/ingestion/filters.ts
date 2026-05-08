import type { RawCandidate } from "./types";

export function shouldDrop(candidate: RawCandidate, feedKey: string): boolean {
  const title = candidate.title.toLowerCase();

  if (feedKey === "npm-recent") {
    if (/^@types\//.test(candidate.title)) return true;
    if (/^@.*\/types$/.test(candidate.title)) return true;
    if (/-test|-fixture|_temp_/.test(candidate.title)) return true;
  }

  if (feedKey === "pypi-updates") {
    if (/(a|b|rc|dev|alpha|beta)\d/i.test(candidate.title)) return true;
  }

  if (feedKey === "hackernews") {
    if (!candidate.sourceUrl || candidate.sourceUrl === "") return true;
    if (title.length < 15) return true;
  }

  return false;
}
