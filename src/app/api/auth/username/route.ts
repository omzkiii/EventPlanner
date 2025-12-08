import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOption } from "../[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOption);
    console.log(
      "[/api/username] session: ",
      JSON.stringify(session?.user ?? null),
    );

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const body = await req.json().catch((err) => {
      console.log("[/api/username] body parse error", err);
      return null;
    });

    console.log("[/api/username] body: ", body);
    const username = body.username.trim();

    const isExist = await prisma.user.findUnique({ where: { username } });
    if (isExist && isExist.id !== session.user.id) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    console.log("[/api/username] updated:", updated);

    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    console.error("[/api/username] unexpected error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 },
    );
  }
}
