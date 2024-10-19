import { NextResponse } from "next/server";

export function middleware(req) {
//   return NextResponse.redirect(new URL('/', req.url));
return NextResponse.next();
}

export const config ={
    matcher: [
     /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}