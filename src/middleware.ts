/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['GUEST', 'HOST', 'FACILITATOR', 'TRANSLATOR', 'ADMIN'],
  '/dashboard/bookings': ['GUEST', 'HOST', 'FACILITATOR', 'TRANSLATOR', 'ADMIN'],
  '/dashboard/experiences': ['HOST'],
  '/dashboard/earnings': ['HOST', 'FACILITATOR', 'TRANSLATOR'],
  '/dashboard/facilitated': ['FACILITATOR'],
  '/dashboard/translations': ['TRANSLATOR'],
  '/dashboard/users': ['ADMIN'],
  '/dashboard/reports': ['ADMIN'],
  '/dashboard/settings': ['GUEST', 'HOST', 'FACILITATOR', 'TRANSLATOR', 'ADMIN'],
  '/dashboard/support': ['GUEST', 'HOST', 'FACILITATOR', 'TRANSLATOR', 'ADMIN'],
  '/sign-up': [],
}

const authRequiredRoutes = [
  '/dashboard',
  '/profile',
  '/bookings',
  '/settings',
]

const redirectIfAuthenticatedRoutes = [
  '/sign-up',
]

import type { AuthUser } from '@/lib/auth-utils';

// Edge-compatible JWT verification function
async function verifyJWT(token: string, secret: string): Promise<AuthUser | null> {
  try {
    // Split the JWT into parts
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode the header and payload
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    // Create signature verification using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(`${parts[0]}.${parts[1]}`);
    const secretKey = encoder.encode(secret);
    
    // Import secret as crypto key
    const key = await crypto.subtle.importKey(
      'raw',
      secretKey,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Decode the signature
    const signature = new Uint8Array(
      Array.from(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')))
        .map(char => char.charCodeAt(0))
    );
    
    // Verify the signature
    const isValid = await crypto.subtle.verify('HMAC', key, signature, data);
    
    if (!isValid) return null;
    
    return payload as AuthUser;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let token: AuthUser | null = null;
  let isAuthenticated = false;
  let userRole: AuthUser['role'] | undefined = undefined;

  // Try to get JWT from Authorization header (Bearer) or cookies
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('token')?.value;
  const jwtToken = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : cookieToken;

  if (jwtToken) {
    // Use Edge-compatible JWT verification
    token = await verifyJWT(jwtToken, process.env.JWT_SECRET || 'your_jwt_secret');
    if (token && token.role) {
      isAuthenticated = true;
      userRole = token.role;
    }
  }

  // Handle auth routes (sign-in, sign-up) - redirect to dashboard if already authenticated
  if (redirectIfAuthenticatedRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      const dashboardRoute = getDashboardRoute(userRole ?? '');
      return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes - check authentication and role
  if (authRequiredRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated || !userRole) {
      const signInUrl = new URL('/sign-up', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Check role-based access for specific routes
    const matchedRoute = Object.keys(protectedRoutes).find(route => pathname.startsWith(route));
    const requiredRoles: string[] | undefined = matchedRoute ? protectedRoutes[matchedRoute as keyof typeof protectedRoutes] : undefined;
    
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
  // If user does not have required role, redirect to /sign-up (or a 403 page if you want)
  const signInUrl = new URL('/sign-up', request.url);
  signInUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export function getDashboardRoute(role: string): string {
  return `/dashboard?role=${role && typeof role === 'string' ? role.toLowerCase() : ''}`;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}