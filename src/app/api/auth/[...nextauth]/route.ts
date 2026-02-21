import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: '/feed', // Redirect to feed on sign in request if generic
    },
    callbacks: {
        async session({ session, token }) {
            return session;
        }
    }
});

export { handler as GET, handler as POST };
