export interface ParsedDep {
    name: string;
    version?: string;
    ecosystem: "node" | "python" | "cloud" | "other";
}

/**
 * Normalizes a dependency name to lowercase, removing invalid characters.
 */
export function normalizeName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9@\/-]/g, "").trim();
}

/**
 * Common aliases for technologies (e.g. mapping package names to canonical entities)
 */
export function applyAlias(normalizedName: string): string {
    // In a full system, this would be a larger DB-backed map
    const aliases: Record<string, string> = {
        "react-dom": "react",
        "@types/react": "react",
        "next": "next.js",
        "@nestjs/core": "nestjs",
        "@nestjs/common": "nestjs",
        "fastapi": "fastapi",
        "pydantic": "pydantic",
        "aws-sdk": "aws",
        "@aws-sdk/client-s3": "aws",
    };

    return aliases[normalizedName] || normalizedName;
}
