// middleware.ts
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const userRole = req.auth?.user?.role;

  // /manager rotasını sadece 'manager' rolündeki kullanıcılar görebilir
  if (pathname.startsWith("/manager") && userRole !== "manager") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  // /dashboard rotasını sadece giriş yapmış kullanıcılar görebilir
  if (pathname.startsWith("/dashboard") && !req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/manager/:path*", "/dashboard/:path*"],
};