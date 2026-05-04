import { ParsedDep } from "../normalize";

export function parseRequirementsTxt(content: string): ParsedDep[] {
    return content
        .split("\n")
        .map(line => line.trim())
        // Ignore comments and pip flags (e.g. -r, -i, --trusted-host)
        .filter(line => line && !line.startsWith("#") && !line.startsWith("-"))
        .map(line => {
            // Match standard pip requirement format: package>=1.0.0 or package==2.0
            // Also handles environment markers conceptually by stopping at semicolon although regex just grabs prefix
            const match = line.split(';')[0].match(/^([a-zA-Z0-9_.-]+)\s*(?:(?:>=|<=|==|~=|!=)\s*(.+))?$/);

            if (!match) return null;

            return {
                name: match[1].toLowerCase(),
                version: match[2] ? match[2].trim() : undefined,
                ecosystem: "python"
            };
        })
        .filter(Boolean) as ParsedDep[];
}
