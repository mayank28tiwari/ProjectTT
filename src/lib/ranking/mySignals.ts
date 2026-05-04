import type { SavedSignal, FollowTag, StackEntity } from "@prisma/client";
import { Signal } from "@/types/signal";

export interface RankedSignal extends Signal {
    rankingScore: number;
    rankingTags: string[];
}

const SCORE_STACK_MATCH = 50;
const SCORE_FOLLOW_MATCH = 20;
const SCORE_SAVED_MATCH = 15;
const SCORE_IMPORTANCE_CRITICAL = 10;
const SCORE_IMPORTANCE_SEVERE = 8;
const SCORE_IMPORTANCE_IMPORTANT = 5;

/**
 * Ranks a list of Signals against a User's profile data.
 * The PRD demands that "My Signals" ranks items matching "Your Stack" highest,
 * followed by explicitly followed tags, importance, and recency.
 */
export function rankSignals(
    signals: Signal[],
    userStack: StackEntity[],
    userFollows: FollowTag[],
    userSaved: SavedSignal[]
): RankedSignal[] {

    const savedSet = new Set(userSaved.map(s => s.signalId));
    const followSet = new Set(userFollows.map(f => f.tag.toLowerCase()));

    // We use the normalizedName for robust mapping
    const stackSet = new Set(userStack.map(s => s.normalizedName));

    const ranked = signals.map(signal => {
        let score = 0;
        const tags: string[] = [];
        const signalEntities = signal.entities.map(e => e.toLowerCase());

        // 1. Check for "Your Stack" matches
        const hasStackMatch = signalEntities.some(e => stackSet.has(e));
        if (hasStackMatch) {
            score += SCORE_STACK_MATCH;
            tags.push("Your Stack");
        }

        // 2. Check for "Following" matches
        // Fallback: If no stack match, but a tag match exists
        const hasFollowMatch = signalEntities.some(e => followSet.has(e));
        if (hasFollowMatch && !hasStackMatch) { // Avoid double badging for same entity
            score += SCORE_FOLLOW_MATCH;
            tags.push("Following");
        }

        // 3. Saved Signals bonus 
        // Usually My Signals are filtered to saved ones, but this works generally
        if (savedSet.has(signal.id)) {
            score += SCORE_SAVED_MATCH;
        }

        // 4. Importance baseline
        switch (signal.importance) {
            case "Critical": score += SCORE_IMPORTANCE_CRITICAL; break;
            case "Severe": score += SCORE_IMPORTANCE_SEVERE; break;
            case "Important": score += SCORE_IMPORTANCE_IMPORTANT; break;
        }

        // 5. Recency penalty (lose 1 point per day old, max 30)
        const daysOld = Math.floor((Date.now() - new Date(signal.publishedAt).getTime()) / (1000 * 60 * 60 * 24));
        score -= Math.min(daysOld, 30);

        return {
            ...signal,
            rankingScore: score,
            rankingTags: tags,
        };
    });

    // Sort descending by score, then by date as tie-breaker
    return ranked.sort((a, b) => {
        if (b.rankingScore !== a.rankingScore) {
            return b.rankingScore - a.rankingScore;
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}
