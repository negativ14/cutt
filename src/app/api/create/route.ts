import { connectDb } from "@/lib/db";
import ShortUrl from "@/lib/models/shorturl.model";
import { nanoid } from "nanoid";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url } = body;

  const urlId = nanoid(7);

  await connectDb();

  const newUrl = new ShortUrl({
    fullUrl: url,
    shortUrl: urlId,
  });

  newUrl.save();
  return NextResponse.json(
    { message: "Short url created successfully.", url: `${url}/${urlId}` },
    { status: 200 }
  );
}
