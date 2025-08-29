import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ urlId: string }> }
) {
  try {
    const urlId = (await params).urlId;

    const redirectUrl = await prisma.url.findFirst({
      where: {
        OR: [{ shortId: urlId }, { customSlug: urlId }],
      },
    });

    if (!redirectUrl) {
      return NextResponse.json({ error: "Url not found!" }, { status: 404 });
    }

    const click = {
      urlId: redirectUrl?.id,
      browser: req.headers.get("user-agent") || null,
    };

    await prisma.click.create({ data: click });

    return NextResponse.redirect(redirectUrl?.originalUrl);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
  }
}
