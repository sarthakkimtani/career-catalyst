import { NextRequest, NextResponse } from "next/server";

import { axiosInstance } from "@/lib/axios";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/search", "/trends"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const response = await axiosInstance.get("/me", {
      headers: {
        Cookie: request.headers.get("cookie"),
      },
    });

    if (!response.data) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/search", "/trends"],
};
