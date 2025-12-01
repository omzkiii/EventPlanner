import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return new Response("the quick brown fox jumps over the lazy dog");
}
