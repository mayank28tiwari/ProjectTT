// OSV (Open Source Vulnerabilities) API Adapter
// Fetches security vulnerability signals from Google's OSV database

import { Signal, Domain } from '@/types/signal';

interface OSVVulnerability {
    id: string;
    summary?: string;
    details?: string;
    modified: string;
    published: string;
    aliases?: string[];
    severity?: Array<{
        type: string;
        score: string;
    }>;
    affected?: Array<{
        package?: {
            name: string;
            ecosystem: string;
        };
        ranges?: Array<{
            type: string;
            events: Array<{ introduced?: string; fixed?: string }>;
        }>;
    }>;
    references?: Array<{
        type: string;
        url: string;
    }>;
}

interface OSVQueryResponse {
    vulns: OSVVulnerability[];
}

// Ecosystem to domain mapping
const ECOSYSTEM_DOMAINS: Record<string, Domain[]> = {
    'npm': ['web'],
    'PyPI': ['ai', 'data', 'web'],
    'Go': ['devops', 'cloud'],
    'crates.io': ['web', 'devops'],
    'RubyGems': ['web'],
    'Maven': ['web', 'data'],
    'NuGet': ['web'],
    'Packagist': ['web'],
    'Hex': ['web'],
    'Pub': ['mobile'],
    'CocoaPods': ['mobile'],
    'SwiftPM': ['mobile'],
    'Linux': ['devops', 'security'],
    'Debian': ['devops'],
    'Alpine': ['devops', 'cloud'],
    'OSS-Fuzz': ['security'],
};

// Priority packages to monitor (high-impact in their ecosystems)
const PRIORITY_PACKAGES = [
    // JavaScript/Node.js
    { ecosystem: 'npm', name: 'express' },
    { ecosystem: 'npm', name: 'lodash' },
    { ecosystem: 'npm', name: 'axios' },
    { ecosystem: 'npm', name: 'next' },
    { ecosystem: 'npm', name: 'react' },

    // Python
    { ecosystem: 'PyPI', name: 'django' },
    { ecosystem: 'PyPI', name: 'flask' },
    { ecosystem: 'PyPI', name: 'requests' },
    { ecosystem: 'PyPI', name: 'numpy' },
    { ecosystem: 'PyPI', name: 'tensorflow' },
    { ecosystem: 'PyPI', name: 'pytorch' },

    // Go
    { ecosystem: 'Go', name: 'github.com/gin-gonic/gin' },
    { ecosystem: 'Go', name: 'github.com/gorilla/mux' },
];

// Get domains from ecosystem
function getDomains(ecosystem: string): Domain[] {
    return ECOSYSTEM_DOMAINS[ecosystem] || ['security'];
}

// Get severity label
function getSeverityLabel(vuln: OSVVulnerability): string {
    if (!vuln.severity?.length) return 'Unknown severity';

    const cvss = vuln.severity.find(s => s.type === 'CVSS_V3');
    if (cvss) {
        const score = parseFloat(cvss.score);
        if (score >= 9.0) return 'Critical';
        if (score >= 7.0) return 'High';
        if (score >= 4.0) return 'Medium';
        return 'Low';
    }

    return 'Unknown severity';
}

// Format affected packages
function formatAffected(vuln: OSVVulnerability): string {
    if (!vuln.affected?.length) return '';

    const packages = vuln.affected
        .filter(a => a.package)
        .map(a => `${a.package!.name} (${a.package!.ecosystem})`)
        .slice(0, 3);

    return packages.length > 0 ? `Affects: ${packages.join(', ')}` : '';
}

// Get advisory URL
function getAdvisoryUrl(vuln: OSVVulnerability): string {
    const advisory = vuln.references?.find(r => r.type === 'ADVISORY');
    if (advisory) return advisory.url;

    // Default to OSV.dev page
    return `https://osv.dev/vulnerability/${vuln.id}`;
}

// Get fix/docs URL
function getDocsUrl(vuln: OSVVulnerability): string | undefined {
    const fix = vuln.references?.find(r => r.type === 'FIX' || r.type === 'PACKAGE');
    return fix?.url;
}

// Query vulnerabilities for a specific package
async function queryPackage(ecosystem: string, name: string): Promise<OSVVulnerability[]> {
    try {
        const response = await fetch('https://api.osv.dev/v1/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                package: { ecosystem, name }
            }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.warn(`OSV API error for ${ecosystem}/${name}: ${response.status}`);
            return [];
        }

        const data: OSVQueryResponse = await response.json();
        return data.vulns || [];
    } catch (error) {
        console.error(`Error querying OSV for ${ecosystem}/${name}:`, error);
        return [];
    }
}

// Fetch recent vulnerabilities for priority packages
export async function fetchOSVSignals(): Promise<Signal[]> {
    const allVulns = await Promise.all(
        PRIORITY_PACKAGES.map(({ ecosystem, name }) =>
            queryPackage(ecosystem, name)
        )
    );

    // Dedupe by ID and filter to recent (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const seen = new Set<string>();
    const recentVulns = allVulns.flat()
        .filter(vuln => {
            if (seen.has(vuln.id)) return false;
            seen.add(vuln.id);

            const published = new Date(vuln.published);
            return published >= thirtyDaysAgo;
        })
        .sort((a, b) =>
            new Date(b.published).getTime() - new Date(a.published).getTime()
        );

    return recentVulns.map(vuln => {
        const ecosystem = vuln.affected?.[0]?.package?.ecosystem || 'Unknown';
        const severity = getSeverityLabel(vuln);
        const affected = formatAffected(vuln);

        return {
            id: `osv-${vuln.id}`,
            signalType: 'security_fix' as const,
            domains: [...getDomains(ecosystem), 'security'] as Domain[],
            source: 'osv' as const,
            sourceUrl: getAdvisoryUrl(vuln),
            publishedAt: vuln.published,
            fetchedAt: new Date().toISOString(),
            whatChanged: `${severity} Vulnerability: ${vuln.id}${vuln.aliases?.[0] ? ` (${vuln.aliases[0]})` : ''}`,
            whyItMatters: `${vuln.summary || 'Security vulnerability discovered.'} ${affected}`.trim(),
            docsUrl: getDocsUrl(vuln),
        };
    });
}

export const osvApi = {
    fetchSignals: fetchOSVSignals,
    queryPackage,
};
