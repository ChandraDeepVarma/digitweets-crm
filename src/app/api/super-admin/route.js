import connectDB from "@/lib/mongodb";
import SuperAdmin from "@/models/SuperAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const existingAdmin = await SuperAdmin.findOne({
    email: "admin@digitweets.com",
  });

  if (!existingAdmin) {
    await SuperAdmin.create({
      email: "admin@digitweets.com",
      password: "admin123",
    });

    return NextResponse.json({
      message: "Super Admin created",
    });
  }

  return NextResponse.json({
    message: "Super Admin already exists",
  });
}
