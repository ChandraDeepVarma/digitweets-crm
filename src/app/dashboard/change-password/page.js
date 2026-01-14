"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@digitweets.com",
        oldPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Old Password is incorrect");
      return;
    }

    alert("Password updated successfully");
    router.push("/dashboard");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <button
          onClick={handleBack}
          className="
          absolute top-4 right-4
          flex items-center gap-2
          text-red-600
          hover:text-red-700
          font-semibold
        "
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <button
            onClick={handleChangePassword}
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
