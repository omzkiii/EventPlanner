import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOption } from "./app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/", "/login", "/api/auth", "/api/users"];

function isPublicPath(pathname: string) {
  return (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  );
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log(`[PROXYING] : ${pathname}`);


  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If it's public
  console.log(`[PROXYING] : a1`)
  if (isPublicPath(pathname)) {
    // logged in but visiting login or /
    if (token && (pathname === "/" || pathname === "/login")) {
      return NextResponse.redirect(new URL("/dsh", req.url));
    }
    return NextResponse.next();
  }

  // Not public  must be authenticated
  console.log(`[PROXYING] : a2`)
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  // Authenticated but missing username\
  console.log(`[PROXYING] : a3`)
  if (!token.username && pathname !== "/username") {
    return NextResponse.redirect(new URL("/username", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$|api/auth|auth|login|username).*)",
  ],
};
