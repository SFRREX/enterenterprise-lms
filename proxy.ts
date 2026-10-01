import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME } from './lib/auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME)

  // Protected route prefixes
  const protectedPrefixes = [
    '/courses',
    '/dashboard',
    '/batch',
    '/assignments',
    '/quizzes',
    '/certificates',
    '/notes',
    '/results',
    '/profile',
    '/teacher',
    '/admin'
  ]

  const isProtected = protectedPrefixes.some(prefix => 
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (isProtected && !sessionCookie?.value) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If already authenticated and visiting /login, redirect to their role home
  if (pathname === '/login' && sessionCookie?.value) {
    try {
      let rawVal = sessionCookie.value
      try {
        rawVal = decodeURIComponent(rawVal)
      } catch {
        // use rawVal
      }
      const session = JSON.parse(rawVal)
      if (session.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      } else if (session.role === 'teacher') {
        return NextResponse.redirect(new URL('/teacher/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch {
      // invalid cookie, proceed to login
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, svg, icons
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
