import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import EmailLog from "@/models/EmailLog";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      await EmailLog.findByIdAndUpdate(id, { opened: true });
    }

    // 1x1 transparent GIF pixel
    const pixel = Buffer.from(
      "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      "base64"
    );

    return new NextResponse(pixel, {
      headers: {
        "Content-Type": "image/gif",
        "Content-Length": pixel.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (err) {
    console.error("Track API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
