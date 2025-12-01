import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
  const result = await prisma.$queryRaw`SELECT NOW()`;
  console.log("✅ Query executed:", result);
  return NextResponse.json({ data: "Hello" });
}
