import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db"; 

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ count: users.length, users });
}