import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { env } from "@/config/env.config";

import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/tools(.*)"]);
const isLandingPage = createRouteMatcher(["/"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    // Redirect signed-in users away from landing page to /tools
    if (isLandingPage(req)) {
      const { userId } = await auth();
      if (userId) {
        return NextResponse.redirect(new URL("/tools", req.url));
      }
    }
  },
  {
    publishableKey: env.CLERK_PUBLISHABLE_KEY,
  },
);

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
