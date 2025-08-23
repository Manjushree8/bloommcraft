// routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//  Get user profile (without password)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(" Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Update user profile (e.g., name, address, profileImage)
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, address, profileImage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update only fields provided
    if (name) user.name = name;
    if (address) user.address = address;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(" Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
