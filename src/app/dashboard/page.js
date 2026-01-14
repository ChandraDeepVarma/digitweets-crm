"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (!response.ok) {
      alert("Logout failed");
      return;
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="
          absolute top-4 right-4
          flex items-center gap-2
          text-red-600
          hover:text-red-700
          font-semibold
        "
      >
        Logout
      </button>
      <button
        onClick={() => router.push("/dashboard/change-password")}
        className="
          absolute top-10 right-4
          flex items-center gap-2
          text-red-600
          hover:text-red-700
          font-semibold
        "
      >
        Change Password
      </button>
      <button
        onClick={() => router.push("/dashboard/edit-profile")}
        className="
          absolute top-16 right-4
          flex items-center gap-2
          text-red-600
          hover:text-red-700
          font-semibold
        "
      >
        Edit Profile
      </button>

      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.8,
          y: -40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          text-green-600
          text-4xl
          md:text-5xl
          font-extrabold
          tracking-wide
          text-center
        "
      >
        WELCOME TO DASHBOARD
      </motion.h1>
    </div>
  );
}
