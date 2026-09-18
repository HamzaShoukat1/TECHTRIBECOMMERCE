import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // 1. Retrieve the authentication token
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // 2. Define public paths that don't require authentication
    const isPublicPath = pathname === '/login' || pathname === '/signup';

    // 3. If the user is NOT logged in and tries to access a protected page, redirect to login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. If the user IS logged in and tries to access login/register, redirect them to home
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// 5. Corrected Matcher Configuration
export const config = {
    /*
     * Matches ALL routes except static files, images, API routes, and metadata.
     * This automatically protects '/orders', '/payment-success', etc., 
     * without needing to list them individually.
     */
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
