// ─────────────────────────────────────────────────────
// M5 Enrichment: Hybrid LLM Enricher setup (Gemini Pro)
// Integrates @google/genai as requested, runs rules first, then LLM.
// ─────────────────────────────────────────────────────

import { GoogleGenAI } from "@google/genai";
import { ENRICHMENT_SYSTEM_PROMPT } from "./prompt";
import { inferImpactLabel, inferImportance, extractEntities, CandidateSignal } from "./rules";
import { ImpactLabel, Importance } from "@/types/signal";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface EnrichmentOutput {
    summary: string;
    whyItMatters: string;
    whoShouldCare: string;
    impactLabel: ImpactLabel;
    importance: Importance;
    entities: string[];
}

export async function enrichSignal(candidate: CandidateSignal): Promise<EnrichmentOutput> {
    const textBody = candidate.textBody.substring(0, 30000); // 30k char limit for context safety

    // 1. Run Rules / Heuristics First
    const ruleImpact = inferImpactLabel(textBody);
    const ruleImportance = inferImportance(textBody, ruleImpact);
    const ruleEntities = extractEntities(textBody, candidate.title);

    // Fallback defaults if LLM fails or API key missing
    const fallbackOutput: EnrichmentOutput = {
        summary: `${candidate.title}. (Auto-generated summary)`,
        whyItMatters: "Review the primary source link for details on this update.",
        whoShouldCare: "Developers using this technology.",
        impactLabel: ruleImpact,
        importance: ruleImportance,
        entities: ruleEntities.length > 0 ? ruleEntities : ["general"],
    };

    if (!process.env.GEMINI_API_KEY) {
        console.warn("⚠️ GEMINI_API_KEY not set. Using fallback rules-only enrichment.");
        return fallbackOutput;
    }

    // 2. Run LLM Second
    try {
        const promptParams = `
INPUT TITLE: ${candidate.title}
RULE-BASED HINTS: (Impact: ${ruleImpact}, Importance: ${ruleImportance}, Entities: ${ruleEntities.join(', ')})

RAW SOURCE TEXT:
${textBody}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: promptParams,
            config: {
                systemInstruction: ENRICHMENT_SYSTEM_PROMPT,
                temperature: 0.1, // Low temp for extraction tasks
                responseMimeType: "application/json",
            },
        });

        const textPayload = response.text;
        if (!textPayload) throw new Error("Empty LLM response");

        const parsed = JSON.parse(textPayload) as Partial<EnrichmentOutput>;

        // Merge LLM results with fallback to ensure all required fields exist
        return {
            summary: parsed.summary || fallbackOutput.summary,
            whyItMatters: parsed.whyItMatters || fallbackOutput.whyItMatters,
            whoShouldCare: parsed.whoShouldCare || fallbackOutput.whoShouldCare,
            impactLabel: (parsed.impactLabel as ImpactLabel) || ruleImpact,
            importance: (parsed.importance as Importance) || ruleImportance,
            entities: parsed.entities && parsed.entities.length > 0 ? parsed.entities : fallbackOutput.entities,
        };
    } catch (error) {
        console.error("LLM Enrichment failed, falling back to rules:", error);
        return fallbackOutput;
    }
}
