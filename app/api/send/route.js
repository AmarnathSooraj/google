import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/utils/db";
import EmailLog from "@/models/EmailLog";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Incoming request body:", body);
    const { toEmail, subject, htmlContent } = body;


    if (!toEmail || !subject || !htmlContent) {
      return NextResponse.json(
        { success: false, error: "Email, subject, and htmlContent are required" },
        { status: 400 }
      );
    }

    const log = await EmailLog.create({
      email: toEmail,       
      subject,
      opened: false,
    });

    // 2. Add tracking pixel
    const trackedHtml = `
      ${htmlContent}
      <img src="${process.env.NEXT_PUBLIC_BASE_URL}/api/track?id=${log._id}" 
           width="1" height="1" style="display:none;" />
    `;

    // 3. Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Send email
    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: toEmail, // ✅ using directly from request
      subject,
      html: trackedHtml,
    });

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.log("Send API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
