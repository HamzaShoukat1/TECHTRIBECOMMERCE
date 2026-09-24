
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/admin', '/cart', '/shop', '/orders', '/checkout', '/product'];

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    console.log(path);

        console.log('🔥 PROXY RUNNING');
    console.log('PATH:', req.nextUrl.pathname);
    
    const isProtectedRoute = protectedRoutes.some((route) => 
        path === route || path.startsWith(`${route}/`)
    );

    if (isProtectedRoute) {
        console.log(req.cookies);
        const token = req.cookies.get('accessToken')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
            console.log("zz",secret)
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
  
    matcher: [
        '/admin/:path*',
        '/shop/:path*',
        '/orders/:path*',
        '/checkout/:path*',
        '/product/:path*', 
        '/cart',
        '/cart/:path*',
    ],
};
