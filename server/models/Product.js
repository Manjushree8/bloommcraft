// server/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    availableFlowers: { type: [String], default: [] },
    availableColors: { type: [String], default: [] },
    styles: { type: [String], default: [] },
    accessories: { type: [String], default: [] },

    //  store image URLs instead of local filenames
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
