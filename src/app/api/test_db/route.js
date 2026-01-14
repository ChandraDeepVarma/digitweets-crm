import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return new Response("MongoDB connected successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to connect to database", {
      status: 500,
    });
  }
}
