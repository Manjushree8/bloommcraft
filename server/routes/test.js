import express from "express"; // Use import instead of require
const router = express.Router();

// Test endpoint
router.get("/", (req, res) => {
  res.json({ message: "API is working fine" });
});

export default router; // Use export default instead of module.exports
