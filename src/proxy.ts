import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("accessToken")?.value;
    const hasToken = Boolean(token && token.trim().length > 0);

    const isAuthPage =
        pathname === "/login" ||
        pathname === "/signup";

    const isProtectedPage =
        pathname.startsWith("/admin");
    pathname.startsWith("/checkout");
    pathname.startsWith("/orders");
    pathname.startsWith("/shop");
    pathname.startsWith("/cart");







    // 1. If trying to access a protected page without a token -> login
    if (isProtectedPage && !hasToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2. If already logged in and hitting an auth page -> home
    if (isAuthPage && hasToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow everything else to pass through smoothly
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
