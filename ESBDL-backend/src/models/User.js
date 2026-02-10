import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,

    // 👇 PROFILE FIELDS
    photo: String,        // base64
    phone: String,
    address: String,
    year: String,
    department: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
