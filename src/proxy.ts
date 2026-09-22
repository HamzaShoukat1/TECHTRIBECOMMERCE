import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only these routes require authentication
  const isProtectedPage =
    pathname === "/checkout" ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/shop")
  pathname.startsWith("/cart") ||
    pathname.startsWith("/admin");

  // Check authentication only for protected routes
  if (isProtectedPage) {
    const hasToken = request.cookies.has("accessToken");

    if (!hasToken) {
      const loginUrl = new URL("/login", request.url);

      // Remember where the user wanted to go
      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  // Everything else is public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};