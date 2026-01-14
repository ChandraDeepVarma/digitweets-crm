import mongoose from "mongoose";

export const SuperAdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.models.SuperAdmin ||
  mongoose.model("SuperAdmin", SuperAdminSchema);
