import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session token from cookies (try multiple possible names)
  const allCookies = request.cookies.getAll();
  const sessionToken = request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better_auth.session_token")?.value ||
    request.cookies.get("session")?.value ||
    request.cookies.get("auth_session")?.value;

  // Debug: Log cookies for protected routes
  if ((pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) && process.env.NODE_ENV === "development") {
    console.log("[Middleware] Cookies:", allCookies.map(c => c.name));
    console.log("[Middleware] Session token found:", !!sessionToken);
  }

  // Define protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/auth");

  // If accessing protected route without session, redirect to sign-in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If accessing auth route with session, redirect to dashboard (but allow the initial navigation after login)
  if (isAuthRoute && sessionToken && !pathname.includes("/api/auth")) {
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
