import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Allow access to login, permission, terms, and privacy pages without token
  if (pathname.startsWith('/login') || pathname.startsWith('/permission') || 
      pathname.startsWith('/terms') || pathname.startsWith('/privacy')) {
   
    return NextResponse.next();
  }

  // Allow API routes to handle their own authentication
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // For all other pages, require token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|fonts|images|video).*)',
  ],
};
