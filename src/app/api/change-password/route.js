import connectDB from "@/lib/mongodb";
import SuperAdmin from "@/models/SuperAdmin";

export async function POST(request) {
  const { email, oldPassword, newPassword } = await request.json();

  await connectDB();

  const admin = await SuperAdmin.findOne({ email });

  if (!admin || admin.password !== oldPassword) {
    return new Response(JSON.stringify({ message: "Old Password Incorrect" }), {
      status: 401,
    });
  }

  admin.password = newPassword;

  await admin.save();

  return new Response(
    JSON.stringify({ message: "Password Changed Successfully" }),
    {
      status: 200,
    }
  );
}
