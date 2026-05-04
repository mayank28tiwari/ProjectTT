// Middleware — protect routes that require auth
// Next.js 16 middleware convention
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/feed",
    },
});

// Only protect specific routes — /feed is public (PRD requirement)
export const config = {
    matcher: ["/saved", "/personalize"],
};
