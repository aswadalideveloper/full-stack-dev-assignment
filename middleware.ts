import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;

  // Protect /movies routes
  if (request.nextUrl.pathname.startsWith("/movies")) {
    if (!userId) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect authenticated users from auth pages to /movies
  if (request.nextUrl.pathname === "/" && userId) {
    return NextResponse.redirect(new URL("/movies", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/movies/:path*"],
};
