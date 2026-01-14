import connectDB from "@/lib/mongodb";
import SuperAdminSession from "@/models/SuperAdminSession";

export async function POST(request) {
  await connectDB();

  const session = await SuperAdminSession.findOne({
    status: "ACTIVE",
  }).sort({ createdAt: -1 });

  if (session) {
    session.status = "LOGGED_OUT";
    session.logoutAt = new Date();
    await session.save();
  }

  return new Response(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
  });
}
