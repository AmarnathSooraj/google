import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "users",
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // stored as plain text
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req) {
  try {
    await connectToDatabase();

    // ✅ Parse request body
    const { email, password } = await req.json();

    // ✅ Save as plain text
    const user = new User({ email, password });
    await user.save();

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("Server error in /submit:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
