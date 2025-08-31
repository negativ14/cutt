import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { nanoid } from "nanoid";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { originalUrl, customSlug } = body;

    if (!originalUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP/HTTPS URLs are allowed" },
        { status: 400 }
      );
    }

    const normalizedUrl = parsedUrl.toString();

    const session = await getServerSession(authOptions);

    if (customSlug) {
      const slug = customSlug.trim().toLowerCase();
      const slugRegex = /^[a-z0-9_-]{3,30}$/;

      if (!slugRegex.test(slug)) {
        return NextResponse.json(
          {
            error:
              "Custom slug must be 3-30 chars, only letters, numbers, - or _ allowed",
          },
          { status: 400 }
        );
      }

      const existingCustomSlug = await prisma.url.findFirst({
        where: { customSlug },
      });

      if (existingCustomSlug) {
        return NextResponse.json(
          { error: "Custom Name is already in use!" },
          { status: 400 }
        );
      }
    }

    const url = {
      shortId: customSlug || nanoid(7),
      originalUrl: normalizedUrl,
      customSlug: customSlug ? customSlug : null,
      userId: session?.user.id || null,
    };

    const newUrl = await prisma.url.create({ data: url });

    return NextResponse.json(
      { message: "Url created successfully!", Url: newUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
  }
}
