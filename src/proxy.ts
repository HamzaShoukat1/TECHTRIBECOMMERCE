import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import path from 'path';

// Next.js expects this function to be named exactly 'middleware'
export function proxy(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // 1. Define authentication-only auth pages
    const isAuthPath = pathname === '/login' || pathname === '/signup';

    // 2. Define pages that are accessible to everyone
    const isPublicPage =
        pathname === '/' ||
        pathname === '/shop' ||
        pathname === '/contact' ||
        pathname === '/cart' ||
        pathname === '/checkout' ||
        pathname === '/orders' ||
        pathname.startsWith('/products/');


    // 3. If user is NOT logged in and path is neither an auth page nor a public page, redirect to login
    if (!token && !isAuthPath && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. If logged in and trying to access login/signup, redirect to home
    if (token && isAuthPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
