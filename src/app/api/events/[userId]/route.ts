import { Event } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  const events = await prisma.event.findMany({ where: { ownerId: userId } });
  return NextResponse.json(events);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const event: Event = await req.json();
  const { userId } = await params;

  await prisma.event.create({ data: { name: event.name, ownerId: userId } });
  return NextResponse.json(event);
}
