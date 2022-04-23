import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Time", new Date().toLocaleString());
  return response
}
