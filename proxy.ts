import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/tools(.*)"]);

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/tools/:path*",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
