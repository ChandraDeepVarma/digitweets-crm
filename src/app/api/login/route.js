import connectDB from "@/lib/mongodb";
import SuperAdmin from "@/models/SuperAdmin";
import SuperAdminSession from "@/models/SuperAdminSession";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectDB();

  const admin = await SuperAdmin.findOne({ email });

  if (!admin || admin.password !== password) {
    return new Response(JSON.stringify({ message: "Invalid Credentials" }), {
      status: 401,
    });
  }

  function detectBrowser(userAgent) {
    if (userAgent.includes("Chrome")) {
      return "Chrome";
    } else if (userAgent.includes("Firefox")) {
      return "Firefox";
    } else if (userAgent.includes("Safari")) {
      return "Safari";
    } else if (userAgent.includes("Edge")) {
      return "Edge";
    } else if (userAgent.includes("IE")) {
      return "IE";
    } else {
      return "Unknown";
    }
  }

  const ipAdress =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "UNKNOWN";

  const userAgent = request.headers.get("user-agent");

  const superAdminSession = await SuperAdminSession.create({
    adminId: admin._id,
    ipAdress,
    userAgent,
  });
  return new Response(
    JSON.stringify({
      message: "Super Admin Login successful",
      role: "SUPER_ADMIN",
    }),
    { status: 200 }
  );
}
