import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { io } from 'socket.io-client';
 
export function middleware(req: NextRequest, event: NextFetchEvent) {
  req.socket = io('http://localhost:3005');
  if (req.cookies.get('isLogined')?.value !== 'true') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
 
   return NextResponse.next();
}

export const config = {
    matcher: ['/', '/messages/t/:path*'],
}
