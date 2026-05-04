// ─────────────────────────────────────────────────────
// Auth Provider Config — priority order: GitHub → LinkedIn → Google
// ─────────────────────────────────────────────────────

export interface AuthProviderConfig {
    id: string;
    name: string;
    icon: "github" | "linkedin" | "google";
    available: boolean;
}

export const AUTH_PROVIDERS: AuthProviderConfig[] = [
    {
        id: "github",
        name: "GitHub",
        icon: "github",
        available: true,
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: "linkedin",
        available: false, // Enable when credentials are set
    },
    {
        id: "google",
        name: "Google",
        icon: "google",
        available: true,
    },
];

export const AUTH_BENEFITS = [
    "Your Stack feed",
    "Save & follow tags",
    "Breaking-change alerts",
] as const;
