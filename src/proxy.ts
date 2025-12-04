import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { NextResponse, NextRequest } from "next/server";
import { authOption } from "./app/api/auth/[...nextauth]/route";

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOption);
  console.log(session);

  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  if (!session?.user.username)
    return NextResponse.redirect(new URL("/username", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$|api/auth|auth|login|username).*)",
  ],
};
