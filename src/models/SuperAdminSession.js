import mongoose from "mongoose";

export const SuperAdminSessionSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true,
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    logoutAt: {
      type: Date,
      default: null,
    },
    ipAdress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "LOGGED_OUT"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SuperAdminSession ||
  mongoose.model("SuperAdminSession", SuperAdminSessionSchema);
