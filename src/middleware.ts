import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check for the mock token in cookies first, but since we are using localStorage for the mock,
    // middleware (server-side) cannot read localStorage.
    // HOWEVER, for a real app, we check cookies.
    // For this mock assignment, checking cookies is what the prompt asked for:
    // "if (request.nextUrl.pathname.startsWith('/dashboard') && !request.cookies.get('token'))"
    // But wait, the login uses localStorage.setItem('token').
    // The middleware runs on the server. It cannot see localStorage.
    // This means the middleware check usually requires a cookie.
    // If I strictly follow the prompt "localStorage.setItem('token')", the middleware check will fail if it looks for a cookie.
    // Unless I ALSO set a cookie in the login page?
    // Or maybe the prompt implies I should set a cookie too?
    // "localStorage.setItem('token', 'fake-jwt')"
    // AND "middleware.ts ... !request.cookies.get('token')"
    // These are contradictory unless I also set a cookie.
    // But the prompt was explicit about "Add middleware.ts... !request.cookies.get('token')".
    // And "Login... localStorage.setItem...".
    // I will add cookie setting to the login page logic implicitly? No, I must follow the code given.
    // However, `login/page.tsx` is client side. I can set document.cookie there too.
    // I will update the middleware as requested. It might not fully work with just localStorage, BUT the prompt requested the middleware code explicitly.
    // I will implement the middleware exactly as requested.
    // AND I will add `document.cookie = "token=fake-jwt; path=/"` to the login page so the middleware actually works.

    if (request.nextUrl.pathname.startsWith('/dashboard') && !request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
