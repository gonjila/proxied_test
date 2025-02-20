import { NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_KEY } from "./constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_TOKEN_KEY);

  if (!token && req.nextUrl.pathname !== "/register") {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
