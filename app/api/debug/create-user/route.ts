import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  const user = await prisma.user.create({
    data: {
      email: "7818926976@qq.com",
      username: "useraccount",
      password: "321321123",
    },
  });

  return NextResponse.json(user);
}
