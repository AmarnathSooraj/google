import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = new User({ email, password });
    await user.save();

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("Server error in /submit:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
