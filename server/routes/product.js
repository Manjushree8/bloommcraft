// server/routes/product.js
import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create product (JSON only)

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      basePrice,
      availableFlowers,
      availableColors,
      styles,
      accessories,
      images, // array of filenames (from /upload) or URLs (from frontend)
    } = req.body;

    const product = new Product({
      name,
      description,
      basePrice,
      availableFlowers: availableFlowers || [],
      availableColors: availableColors || [],
      styles: styles || [],
      accessories: accessories || [],
      images: images || [], // directly save array
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(" Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
});


//  Get all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


//  Get product by ID

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});


//  Update product

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      basePrice,
      availableFlowers,
      availableColors,
      styles,
      accessories,
      images,
    } = req.body;

    const updateData = {
      name,
      description,
      basePrice,
      availableFlowers: availableFlowers || [],
      availableColors: availableColors || [],
      styles: styles || [],
      accessories: accessories || [],
      images: images || [], //  overwrite images with array from frontend
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});


//  Delete product

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: " Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
