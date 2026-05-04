// ─────────────────────────────────────────────────────
// M5 Enrichment: Rules-first heuristics
// Determines impactLabel, importance, and category based on raw text.
// Used as inputs to guide the LLM or act as fallbacks.
// ─────────────────────────────────────────────────────

import { ImpactLabel, Importance, Category } from "@/types/signal";

export interface CandidateSignal {
    title: string;
    sourceUrl: string;
    rawPayload: any; // The raw JSON from the source (e.g. GitHub release body)
    textBody: string; // The concatenated text content to analyze
}

/**
 * Heuristic scoring to determine ImpactLabel
 */
export function inferImpactLabel(text: string): ImpactLabel {
    const lower = text.toLowerCase();

    if (/cve-\d{4}-\d{4,}/.test(lower) || lower.includes("security") || lower.includes("vulnerabilit")) {
        return "SecurityFix";
    }

    if (lower.includes("breaking change") || lower.includes("deprecated") || lower.includes("removed")) {
        return "BreakingChange";
    }

    if (lower.includes("performance") || lower.includes("faster") || lower.includes("latency") || lower.includes("memory usage")) {
        return "PerformanceImprovement";
    }

    if (lower.includes("pricing") || lower.includes("cost") || lower.includes("billing")) {
        return "CostChange";
    }

    if (lower.includes("new feature") || lower.includes("introduced") || lower.includes("support for") || lower.includes("added")) {
        return "NewCapability";
    }

    return "Silent";
}

/**
 * Heuristic scoring to determine Importance
 */
export function inferImportance(text: string, impactLabel: ImpactLabel): Importance {
    const lower = text.toLowerCase();

    // Security + critical keywords or CVEs usually mean Critical/Severe
    if (impactLabel === "SecurityFix") {
        if (lower.includes("critical") || lower.includes("remote code execution") || lower.includes("rce") || lower.includes("ssrf")) {
            return "Critical";
        }
        return "Severe";
    }

    if (impactLabel === "BreakingChange") {
        if (lower.includes("major release") || lower.includes("migration required")) {
            return "Severe";
        }
        return "Important";
    }

    if (lower.includes("major release") || lower.includes("ga") || lower.includes("generally available")) {
        return "Important";
    }

    if (lower.includes("minor fix") || lower.includes("typo") || lower.includes("docs update")) {
        return "Low";
    }

    return "Normal";
}

/**
 * Entity extraction based on common tech terms.
 * In a full implementation, this could use a precompiled regex or NLP.
 */
export function extractEntities(text: string, title: string): string[] {
    const entities = new Set<string>();
    const combined = `${title} ${text}`.toLowerCase();

    const knownTech = [
        "react", "next.js", "vue", "angular", "svelte", "tailwind",
        "python", "node.js", "rust", "go", "golang", "java", "typescript",
        "aws", "gcp", "azure", "kubernetes", "docker", "terraform",
        "postgresql", "mysql", "mongodb", "redis", "duckdb",
        "openai", "anthropic", "langchain", "pytorch", "tensorflow", "gemini",
        "stripe", "vercel", "cloudflare", "supabase", "prisma"
    ];

    for (const tech of knownTech) {
        // Simple word boundary check
        const regex = new RegExp(`\\b${tech.replace('.', '\\.')}\\b`, 'i');
        if (regex.test(combined)) {
            entities.add(tech);
        }
    }

    return Array.from(entities);
}
