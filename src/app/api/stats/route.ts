import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [userCount, urlCount, clickCount] = await Promise.all([
      prisma.user.count(),
      prisma.url.count(),
      prisma.click.count(),
    ]);

    return NextResponse.json(
      {
        userCount,
        urlCount,
        clickCount,
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
  }
}
