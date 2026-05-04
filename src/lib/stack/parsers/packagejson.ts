import { ParsedDep } from "../normalize";

export function parsePackageJson(content: string): ParsedDep[] {
    try {
        const pkg = JSON.parse(content);
        const deps: ParsedDep[] = [];

        // Extract from dependencies
        for (const [name, version] of Object.entries(pkg.dependencies || {})) {
            deps.push({
                name,
                version: String(version).replace(/[\^~>=<]/g, ""),
                ecosystem: "node"
            });
        }

        // Extract from devDependencies
        for (const [name, version] of Object.entries(pkg.devDependencies || {})) {
            // Skip common local tooling noise if desired, but for MVP keep it
            deps.push({
                name,
                version: String(version).replace(/[\^~>=<]/g, ""),
                ecosystem: "node"
            });
        }

        // Extract from peerDependencies
        for (const [name, version] of Object.entries(pkg.peerDependencies || {})) {
            deps.push({
                name,
                version: String(version).replace(/[\^~>=<]/g, ""),
                ecosystem: "node"
            });
        }

        return deps;
    } catch (e) {
        console.error("Failed to parse package.json", e);
        return [];
    }
}
