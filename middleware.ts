import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_ROUTES = [
    '/dashboard',
    '/user',
    '/user:path*',
    '/post',
    '/post:path*',
];

const AUTH_ROUTES = [
    '/login',
    '/register',
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}