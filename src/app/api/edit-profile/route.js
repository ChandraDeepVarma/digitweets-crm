import superAdminProfile from "@/models/superAdminProfile";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();

    const profile = await superAdminProfile.findOne();

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    // Text fields
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      mobileNumber: formData.get("mobileNumber"),
      alternateMobileNumber: formData.get("alternateMobileNumber"),
      country: formData.get("country"),
      state: formData.get("state"),
      city: formData.get("city"),
      pincode: formData.get("pincode"),
      gender: formData.get("gender"),
      language: formData.getAll("language"),
    };

    console.log(data);

    // Fetch existing profile (only one)
    let profile = await superAdminProfile.findOne();

    // Upload profile picture
    const profilePicture = formData.get("profilePicture");
    if (profilePicture && profilePicture.size > 0) {
      // Delete old image if exists
      if (profile?.profilePicture?.public_id) {
        await cloudinary.uploader.destroy(profile.profilePicture.public_id);
      }

      const buffer = Buffer.from(await profilePicture.arrayBuffer());

      const uploadedImage = await cloudinary.uploader.upload(
        `data:${profilePicture.type};base64,${buffer.toString("base64")}`,
        {
          folder: "crm/super-admin/profile-picture",
        }
      );

      data.profilePicture = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    // Upload resume
    const resume = formData.get("resume");
    if (resume && resume.size > 0) {
      // Delete old resume if exists
      if (profile?.resume?.public_id) {
        await cloudinary.uploader.destroy(profile.resume.public_id, {
          resource_type: "raw",
        });
      }

      const buffer = Buffer.from(await resume.arrayBuffer());

      const uploadedResume = await cloudinary.uploader.upload(
        `data:${resume.type};base64,${buffer.toString("base64")}`,
        {
          folder: "crm/super-admin/resume",
          resource_type: "raw",
        }
      );

      data.resume = {
        url: uploadedResume.secure_url,
        public_id: uploadedResume.public_id,
      };
    }

    // Create OR Update (single document logic)
    if (profile) {
      profile = await superAdminProfile.findOneAndUpdate({}, data, {
        new: true,
      });
    } else {
      profile = await superAdminProfile.create(data);
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
