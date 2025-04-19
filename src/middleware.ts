import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authStatus = request.cookies.get('auth_status')?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname.startsWith('/auth')
  const isDashboard = pathname.startsWith('/cofrinho')

  if (isAuthPage && authStatus) {
    return NextResponse.redirect(new URL('/cofrinho', request.url))
  }

  if (isDashboard && !authStatus) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cofrinho/:path*',
    '/auth/:path*',
  ],
}