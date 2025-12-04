import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOption } from "../[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { username } = await req.json();

  await prisma.user.update({
    where: { email: session.user.email },
    data: { username },
  });

  return NextResponse.json({ success: true });
}
