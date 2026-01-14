"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });
    const data = await res.json();
    console.log(data);
    alert(data.message);
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
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleRegister}
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
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
