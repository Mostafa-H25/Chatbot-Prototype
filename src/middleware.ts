import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:4200", "http://172.0.0.1"];

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;

  // const isUnauthenticatedPath = path === "/";

  // const cookieStore = cookies();
  // const token = cookieStore.get("authorization")?.value || "";
  // // const isExpired = cookieStore.get("authorization")?.

  // if (!token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // if (isUnauthenticatedPath && token) {
  //   return NextResponse.redirect(new URL("/chat", request.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
