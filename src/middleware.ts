import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check for Railway token OR Vercel domain session cookie
    const token =
        request.cookies.get('accessToken')?.value ||
        request.cookies.get('logged_in')?.value;

    const { pathname } = request.nextUrl;

    // 1. Auth paths
    const isAuthPath = pathname === '/login' || pathname === '/signup';

    // 2. Public paths
    const isPublicPage =
        pathname === '/' ||
        pathname === '/shop' ||
        pathname === '/contact' ||
        pathname === '/cart' ||
        pathname.startsWith('/products/');

    // 3. Unauthenticated user accessing protected route (/orders, /profile, etc.)
    if (!token && !isAuthPath && !isPublicPage) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 4. Authenticated user accessing /login or /signup
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