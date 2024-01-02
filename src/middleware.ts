import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
 
export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.cookies.get('isLogined')?.value !== 'true') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
 
   return NextResponse.next();
}

export const config = {
    matcher: ['/'],
}
