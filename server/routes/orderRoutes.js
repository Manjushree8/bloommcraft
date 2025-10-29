import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js"; //  needed to fetch product prices
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders (for admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email"); // include customer info
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});

/**
 *  Create a new order
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, address, deliveryDate } = req.body;

    if (!products || !address || !deliveryDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //  calculate totalPrice from products
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.basePrice * (item.quantity || 1);
      }
    }

    const order = new Order({
      userId: req.user.id,
      products,
      address,
      deliveryDate,
      totalPrice, 
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});

/**
 * Get logged-in user’s orders
 */
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("products.productId", "name basePrice"); // only return needed product fields

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

//  Update order status (admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
});

//  Delete order (admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
});

export default router;
