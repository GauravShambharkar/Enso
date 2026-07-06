import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { env } from "@/config/env.config";

const isProtectedRoute = createRouteMatcher(["/tools(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  },
  {
    publishableKey: env.CLERK_PUBLISHABLE_KEY,
  },
);

export const config = {
  matcher: ["/tools/:path*", "/(api|trpc)(.*)", "/__clerk/:path*"],
};
