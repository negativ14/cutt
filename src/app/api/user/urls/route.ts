import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 401 }
    );
  }

  try {
    const urls = await prisma.url.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        shortId: true,
        originalUrl: true,
        customSlug: true,
        createdAt: true,
        _count: {
          select: { clicks: true },
        },
      },
    });

    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
  }
}
