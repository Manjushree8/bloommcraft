import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js"; // needed to fetch product prices
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//  Create a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log(" Order Payload:", req.body);
    const { products, address, deliveryDate } = req.body;

    if (!products || !address || !deliveryDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //  Calculate total price
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.basePrice * item.quantity;
      }
    }

    const order = new Order({
      userId: req.user.id, //  comes from token
      products,
      address,
      deliveryDate,
      totalPrice, //  save total
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(" Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});

//  Get orders for the logged-in user
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("products.productId", "name basePrice");

    res.json(orders);
  } catch (error) {
    console.error(" Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
