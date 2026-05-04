// OSV (Open Source Vulnerabilities) API Adapter
// Fetches security vulnerability signals from Google's OSV database

import { Signal, Category } from '@/types/signal';

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

// Ecosystem to category mapping (primary category for the affected package)
const ECOSYSTEM_CATEGORY: Record<string, Category> = {
    'npm': 'Web',
    'PyPI': 'AI',
    'Go': 'Backend',
    'crates.io': 'Backend',
    'RubyGems': 'Web',
    'Maven': 'Backend',
    'NuGet': 'Backend',
    'Packagist': 'Web',
    'Hex': 'Backend',
    'Pub': 'Mobile',
    'CocoaPods': 'Mobile',
    'SwiftPM': 'Mobile',
    'Linux': 'DevOps',
    'Debian': 'DevOps',
    'Alpine': 'Cloud',
    'OSS-Fuzz': 'Security',
};

// Priority packages to monitor
const PRIORITY_PACKAGES = [
    { ecosystem: 'npm', name: 'express' },
    { ecosystem: 'npm', name: 'lodash' },
    { ecosystem: 'npm', name: 'axios' },
    { ecosystem: 'npm', name: 'next' },
    { ecosystem: 'npm', name: 'react' },
    { ecosystem: 'PyPI', name: 'django' },
    { ecosystem: 'PyPI', name: 'flask' },
    { ecosystem: 'PyPI', name: 'requests' },
    { ecosystem: 'PyPI', name: 'numpy' },
    { ecosystem: 'PyPI', name: 'tensorflow' },
    { ecosystem: 'PyPI', name: 'pytorch' },
    { ecosystem: 'Go', name: 'github.com/gin-gonic/gin' },
    { ecosystem: 'Go', name: 'github.com/gorilla/mux' },
];

// Get category from ecosystem — always Security since these are vulns
function getCategory(ecosystem: string): Category {
    return 'Security';
}

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

function formatAffected(vuln: OSVVulnerability): string {
    if (!vuln.affected?.length) return '';

    const packages = vuln.affected
        .filter(a => a.package)
        .map(a => `${a.package!.name} (${a.package!.ecosystem})`)
        .slice(0, 3);

    return packages.length > 0 ? `Affects: ${packages.join(', ')}` : '';
}

function getAdvisoryUrl(vuln: OSVVulnerability): string {
    const advisory = vuln.references?.find(r => r.type === 'ADVISORY');
    if (advisory) return advisory.url;
    return `https://osv.dev/vulnerability/${vuln.id}`;
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
            next: { revalidate: 3600 }
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
        const advisoryUrl = getAdvisoryUrl(vuln);

        return {
            id: `osv-${vuln.id}`,
            title: `${severity} Vulnerability: ${vuln.id}${vuln.aliases?.[0] ? ` (${vuln.aliases[0]})` : ''}`,
            summary: `${vuln.summary || 'Security vulnerability discovered.'} ${affected}`.trim(),
            whyItMatters: `${vuln.summary || 'Security vulnerability discovered.'} ${affected}`.trim(),
            whoShouldCare: `Security teams, developers using affected packages (${ecosystem} ecosystem).`,
            category: getCategory(ecosystem),
            impactLabel: 'SecurityFix' as const,
            importance: severity === 'Critical' ? 'Critical' as const : severity === 'High' ? 'Severe' as const : 'Important' as const,
            entities: vuln.affected?.filter(a => a.package).map(a => a.package!.name).slice(0, 5) || [],
            sourceType: 'osv' as const,
            sourceName: 'OSV',
            sourceUrl: advisoryUrl,
            publishedAt: vuln.published,
            fetchedAt: new Date().toISOString(),
            citations: [
                { url: advisoryUrl, title: 'Advisory' },
                ...(vuln.references?.filter(r => r.type === 'FIX').map(r => ({ url: r.url, title: 'Fix' })) || []),
            ],
        };
    });
}

export const osvApi = {
    fetchSignals: fetchOSVSignals,
    queryPackage,
};
