import { NextRequest, NextResponse } from 'next/server';
import { getToken, verifyAuth } from './lib/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = getToken();
  const url = request.nextUrl;

  if (!token && url.pathname.startsWith('/api/dashboard')) {
    return Response.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if(!token && (url.pathname.startsWith('/dashboard') || url.pathname === "/")) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') || url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  // validate the user is authenticated
  verifyAuth(request)
    .then(() => {      
      if (
        token &&
        (url.pathname.startsWith('/sign-in') ||
          url.pathname.startsWith('/sign-up'))
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    })
    .catch((err) => {
      console.error('Error:', err.message);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:function*', '/sign-in', '/', '/sign-up', '/dashboard/:path*']
};
