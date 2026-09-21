import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check for the authentication token in cookies (returns boolean directly)
    const hasToken = request.cookies.has("accessToken");

    const isAuthPage =
        pathname === "/login" ||
        pathname === "/signup";

    // Fixed: Added missing || operators so all routes are properly grouped
    const isProtectedPage =
        pathname === "/checkout" ||
        pathname.startsWith("/orders") ||
        pathname.startsWith("/shop") ||
        pathname.startsWith("/cart") ||
        pathname.startsWith("/admin");

    // 2. If trying to access a protected page without being logged in -> redirect to /login
    if (isProtectedPage && !hasToken) {
        const loginUrl = new URL("/login", request.url);
        // Optional: Pass the original URL so you can redirect back after login
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. If already logged in and trying to access /login or /signup -> redirect to home
    if (isAuthPage && hasToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow public pages and all other allowed conditions to pass through
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
