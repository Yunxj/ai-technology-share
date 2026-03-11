import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) {
    const token =
      request.cookies.get("admin_token")?.value ??
      request.headers.get("Authorization")?.replace("Bearer ", "");
    const password = process.env.ADMIN_PASSWORD;
    if (!password || token !== password) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
