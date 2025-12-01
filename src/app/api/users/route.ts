import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await prisma.user.findMany();
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // parse JSON body
    const { name, username, email } = body;

    const newUser = await prisma.user.create({
      data: { name, username, email },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
