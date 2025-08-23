import User from "../models/User.js";

export default async function requireAdmin(req, res, next) {
  try {
    // authMiddleware must run before this and set req.user.id
    const user = await User.findById(req.user.id).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}
