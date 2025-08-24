// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendOtpEmail, sendWelcomeEmail } from "../utils/mailer.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";

// In-memory OTP store with expiry
// otpStore[email] = { code: "123456", exp: <timestamp> }
const otpStore = {};

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

// REGISTER
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    email = email.trim().toLowerCase();

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Send Welcome Email (await + log error)
    try {
      await sendWelcomeEmail(email, name);
      console.log(`✅ Welcome email sent to ${email}`);
    } catch (mailErr) {
      console.error("❌ Failed to send welcome email:", mailErr);
    }

    const token = signToken(user._id);
    return res.status(201).json({
      message: "Registration successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


/**
 * LOGIN - Step 1: Send OTP
 */
router.post("/send-otp", async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const exp = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore[email] = { code, exp };

    await sendOtpEmail(email, code);
    return res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

/**
 * LOGIN - Step 2: Verify OTP
 */
router.post("/verify-otp", async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    email = email.trim().toLowerCase();

    const entry = otpStore[email];
    if (!entry) return res.status(400).json({ message: "No OTP found, please request again" });
    if (Date.now() > entry.exp) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired, please request again" });
    }
    if (entry.code !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // OTP success → clear otp
    delete otpStore[email];

    const token = signToken(user._id);
    return res.json({
      message: "Login successful",
      token,
      role: user.role, 
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});

/**
 * GET /auth/me
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Always fetch from DB to ensure fresh info
    const user = await User.findById(req.user._id).select("_id name email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("Auth Me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
