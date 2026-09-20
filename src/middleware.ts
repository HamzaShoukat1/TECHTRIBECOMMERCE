import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup";

  const isPublicPage =
    pathname === "/" ||
    pathname === "/shop" ||
    pathname === "/contact" ||
    pathname === "/cart" ||
    pathname.startsWith("/products/");

  const isProtectedPage =
    pathname === "/checkout" ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/admin");

  // Public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Login / signup
  if (isAuthPage) {
    return NextResponse.next();
  }

  // Protected pages
  if (isProtectedPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};