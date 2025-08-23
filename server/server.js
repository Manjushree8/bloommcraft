import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";



// Routes
import testRoute from "./routes/test.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";  // <-- use JSON one

import orderRoutes from "./routes/orderRoutes.js";   //  use only this one
//import adminRoute from "./routes/admin.js";
import adminRoutes from "./routes/adminRoutes.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

//  serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("🌸 BloomCraft API is running..."));

//  Routes
app.use("/api/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoutes);   //  correct
//app.use("/api/admin", adminRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
