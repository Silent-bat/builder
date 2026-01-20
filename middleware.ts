import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get ALL cookies for debugging
  const allCookies = Array.from(request.cookies.getAll());
  
  // Get the session token from cookies (try multiple possible names)
  const sessionToken = request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("session")?.value ||
    request.cookies.get("auth_session")?.value ||
    request.cookies.get("better-auth.session")?.value;

  // Debug logging for production
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    console.log("[Middleware]", {
      pathname,
      hasSessionToken: !!sessionToken,
      cookieCount: allCookies.length,
      cookieNames: allCookies.map(c => c.name),
      sessionTokenSource: sessionToken ? 
        (request.cookies.get("better-auth.session_token")?.value ? "better-auth.session_token" :
         request.cookies.get("session")?.value ? "session" :
         request.cookies.get("auth_session")?.value ? "auth_session" : "better-auth.session") : "none"
    });
  }

  // Define protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/auth");

  // If accessing protected route without session, redirect to sign-in
  if (isProtectedRoute && !sessionToken) {
    console.log("[Middleware] Redirecting to sign-in:", pathname);
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If accessing auth route with session, redirect to dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For admin routes, we'll check the role in the page component
  // since we need to verify the session with the database

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
