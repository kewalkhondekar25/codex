import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhook/register"]);

export default clerkMiddleware(async (auth, req) => {
  if(!isPublicRoute(req)){
    await auth.protect();
  };
  const url = new URL(req.url);
  const forwardedHost = req.headers.get("x-forwarded-host");

  // Ensure forwarded host matches the actual host
  if (forwardedHost && forwardedHost !== url.host) {
    const newHeaders = new Headers(req.headers);
    newHeaders.set("x-forwarded-host", url.host);

    return NextResponse.next({
      request: { headers: newHeaders },
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};