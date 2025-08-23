import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
      {/*  Show first product image */}
      {product.images && product.images.length > 0 ? (
        <div className="w-full h-60 flex items-center justify-center bg-white rounded-md mb-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-60 object-contain rounded-md"
          />
        </div>
      ) : (
        <div className="w-full h-60 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md mb-3">
          No Image
        </div>
      )}

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600 flex-1">{product.description}</p>
      <p className="mt-2 font-bold text-pink-600">₹{product.basePrice}</p>

      {/* View button */}
      <Link
        to={`/Product/${product._id}`}
        className="mt-3 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg text-center hover:bg-pink-600 transition"
      >
        View
      </Link>
    </div>
  );
}
