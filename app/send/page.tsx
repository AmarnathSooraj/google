"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  async function sendEmail() {

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toEmail: email, 
        subject: "🎉 Welcome!",
        htmlContent: "<h1>Hello!</h1><p>This is a test email.</p>",
      }),
    });

    const data = await res.json();
    console.log(data.message || data.error)
  }

  return (

    <div className="p-10">
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button onClick={sendEmail} className="bg-green-500 text-white px-4 py-2 rounded">
        Send Email
      </button>
    </div>
  );
}
