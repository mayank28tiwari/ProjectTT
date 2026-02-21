import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/feed",
    },
});

export const config = { matcher: ["/saved"] };
