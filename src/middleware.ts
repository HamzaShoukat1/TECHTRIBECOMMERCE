import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Authentication cookie
  const token = request.cookies.get("accessToken")?.value;

  // Auth pages
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup";

  // Public pages
  const isPublicPage =
    pathname === "/" ||
    pathname === "/shop" ||
    pathname === "/contact" ||
    pathname === "/cart" ||
    pathname.startsWith("/products/");

  // Protected pages
  const isProtectedPage =
    pathname === "/checkout" ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/admin");

  // --------------------------------------------------
  // 1. Public pages → allow everyone
  // --------------------------------------------------
  if (isPublicPage) {
    return NextResponse.next();
  }

  // --------------------------------------------------
  // 2. Login / Signup
  // --------------------------------------------------
  if (isAuthPage) {
    // Already logged in
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Not logged in
    return NextResponse.next();
  }

  // --------------------------------------------------
  // 3. Protected pages
  // --------------------------------------------------
  if (isProtectedPage) {
    // Not logged in
    if (!token) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname
      );

      return NextResponse.redirect(loginUrl);
    }

    // Logged in
    return NextResponse.next();
  }

  // --------------------------------------------------
  // 4. Any other route
  // --------------------------------------------------
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
