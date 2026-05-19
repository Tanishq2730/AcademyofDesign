import { NextResponse } from 'next/server';
import * as jose from 'jose';

// Protect these routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup'];

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // Get token from cookie
  const token = request.cookies.get('token')?.value;

  // Validate token if it exists
  let isTokenValid = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jose.jwtVerify(token, secret);
      isTokenValid = true;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      isTokenValid = false;
    }
  }

  // Redirect to login if accessing a protected route without a valid token
  if (isProtectedRoute && !isTokenValid) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to home if accessing public routes (login/signup) while already authenticated
  if (isPublicRoute && isTokenValid) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
