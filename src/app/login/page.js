"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="
      w-full max-w-md
      bg-white
      rounded-xl
      shadow-lg
      p-8
      transition-all
      duration-300
      hover:shadow-2xl
      hover:-translate-y-1
    "
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
          px-4 py-2
          border border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
          px-4 py-2
          border border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
          />

          <button
            onClick={handleLogin}
            className="
          mt-4
          bg-blue-600
          text-white
          py-2
          rounded-lg
          font-medium
          hover:bg-blue-700
          transition-colors
          duration-300
        "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
