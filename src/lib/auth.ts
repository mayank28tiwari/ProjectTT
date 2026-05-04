// ─────────────────────────────────────────────────────
// Shared NextAuth config — used by route handler + getServerSession
// ─────────────────────────────────────────────────────

import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // Provider priority: GitHub → LinkedIn → Google (PRD)
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        // LinkedIn uses the generic OIDC provider in next-auth v4
        // Uncomment when LINKEDIN credentials are available:
        // {
        //   id: "linkedin",
        //   name: "LinkedIn",
        //   type: "oauth",
        //   authorization: { url: "https://www.linkedin.com/oauth/v2/authorization", params: { scope: "openid profile email" } },
        //   token: "https://www.linkedin.com/oauth/v2/accessToken",
        //   userinfo: "https://api.linkedin.com/v2/userinfo",
        //   clientId: process.env.LINKEDIN_CLIENT_ID || "",
        //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
        //   profile(profile) {
        //     return { id: profile.sub, name: profile.name, email: profile.email, image: profile.picture };
        //   },
        // },
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/feed", // Redirect to feed — login is handled via modal
    },
    callbacks: {
        async session({ session, user }) {
            // Attach user.id and role to the session so client can access them
            if (session.user) {
                (session.user as any).id = user.id;
                (session.user as any).role = (user as any).role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
