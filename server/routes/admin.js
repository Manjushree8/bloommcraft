import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js"; 

const router = express.Router();

// Admin dashboard route
router.get("/dashboard", (req, res) => {
  res.json({
    totalUsers: 25,
    totalOrders: 40,
    totalRevenue: 5000,
  });
});


// Dashboard stats
router.get("/stats", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [products, orders, customers] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
    ]);
    res.json({ products, orders, customers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

// Customers
router.get("/customers", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("_id name email createdAt");
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load customers" });
  }
});

// Orders
router.get("/orders", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load orders" });
  }
});

// Products (admin CRUD)
router.post("/products", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { name, basePrice, description, imageUrl, stock } = req.body;
    const product = await Product.create({ name, basePrice, description, imageUrl, stock });
    res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Failed to create product" });
  }
});

router.put("/products/:id", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Failed to update product" });
  }
});

router.delete("/products/:id", authMiddleware, requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Failed to delete product" });
  }
});

export default router;
