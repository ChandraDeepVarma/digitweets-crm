import mongoose from "mongoose";

const superAdminProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    alternateMobileNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    profilePicture: {
      url: { type: String, required: true },
      public_id: String,
    },
    resume: {
      url: { type: String, required: true },
      public_id: String,
    },
  },
  { timestamps: true }
);

const superAdminProfile = mongoose.model(
  "superAdminProfile",
  superAdminProfileSchema
);

export default superAdminProfile;
