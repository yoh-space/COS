import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/cms(.*)',
]);

// Define public API routes that don't require authentication
const isPublicApiRoute = createRouteMatcher([
  '/api/webhooks(.*)',
  '/api/send-email(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public API routes without authentication
  if (isPublicApiRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin and CMS routes
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch (error) {
      // Handle authentication errors
      const url = new URL('/sign-in', req.url);
      url.searchParams.set('redirect_url', req.url);
      
      // For API routes, return JSON error
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // For page routes, redirect to sign-in
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};