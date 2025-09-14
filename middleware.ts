import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Simple auth-aware middleware using a cookie named 'authToken'.
// NOTE: Middleware cannot access localStorage. Ensure you also set a cookie on login if you want this to enforce auth.

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip static files, images, and API routes
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    /\.\w+$/.test(pathname) || // any file extension
    pathname.startsWith("/api");

  if (isPublicAsset) return NextResponse.next();

  const token = req.cookies.get("authToken")?.value;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const requiresAuth =
    pathname.startsWith("/protected") || pathname.startsWith("/dashboard");

  // If user is authenticated, prevent visiting login/register
  if (isAuthPage && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If route requires auth and no token cookie, redirect to home (or /login if you add that page)
  if (requiresAuth && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // change to "/login" if you have a dedicated login page
    if (pathname) url.searchParams.set("from", pathname + (search || ""));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Run middleware on all routes except static assets/images (redundant to in-code checks, but faster to skip here)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)"],
};
