import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Authentication disabled - allow direct access
  return NextResponse.next();
}

export const config = {
  matcher: '/cah-expert-control/:path*',
};
