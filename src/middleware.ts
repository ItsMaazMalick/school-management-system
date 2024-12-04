import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptString } from "./lib/encryption";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (!token && !isAuthPage) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!token && isAuthPage) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //   if (token && !isAuthPage) {
  //     // Redirect to login if not authenticated
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
