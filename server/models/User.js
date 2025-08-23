import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] }, // <— NEW
  verified: { type: Boolean, default: false },
  profileImage: { type: String, default: "" },
  otp: { type: String, default: "" },
  otpVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
