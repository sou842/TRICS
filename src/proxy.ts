import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "trics-session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  
  const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect Supervisor routes
  if (pathname.startsWith("/supervisor")) {
    if (!session || session.role !== "supervisor") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect from login if already logged in
  if (pathname === "/login" && session) {
    const redirectUrl = session.role === "admin" ? "/admin" : "/supervisor";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/supervisor/:path*", "/login"],
};
