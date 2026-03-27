import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const path = request.nextUrl.pathname;

  // 1. Protected routes for authenticated users
  const isProtectedRoute =
    path.startsWith("/profile") ||
    path.startsWith("/help") ||
    path.startsWith("/events") ||
    path.startsWith("/directory") ||
    path.startsWith("/smart-matching");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // 2. Role-based access control
  if (path.startsWith("/admin")) {
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  if (path.startsWith("/ambassador")) {
    if (!session || (session.user.role !== "AMBASSADOR" && session.user.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // 3. Prevent logged in users from visiting login/register
  if ((path === "/login" || path === "/register") && session) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
