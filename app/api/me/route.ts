
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";


export async function GET() {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { user: null, message: "No token" },
      { status: 401 }
    );
  }

  try {
    const payload = await verifyToken(token);

    return NextResponse.json(
      {
        user: {
          userId: (payload as any).userId,
          username: (payload as any).username,
          email: (payload as any).email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    // token 过期 / 被篡改 / 校验失败
    return NextResponse.json(
      { user: null, message: "Invalid token" },
      { status: 401 }
    );
  }
}