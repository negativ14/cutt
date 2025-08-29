import { connectDb } from "@/lib/db";
import ShortUrl from "@/lib/models/shorturl.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortUrl: string }> }
) {
  try {
    const { shortUrl } = await context.params;

    await connectDb();

    const urlDoc = await ShortUrl.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks: 1 } }
    );

    let redirectUrl = urlDoc.fullUrl;
    if (!/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = `https://${redirectUrl}`;
    }

    if (!urlDoc) {
      return NextResponse.json({ message: "Url not found" }, { status: 404 });
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.log("the be error", error);
    return NextResponse.json({ message: "Url not found" }, { status: 500 });
  }
}
