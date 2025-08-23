import React from "react";

export default function CartItem({ item, onRemove }) {
  if (!item) return null;

  const product = item.product || item;

  //  Construct proper image URL (same logic as ProductDetail)
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${import.meta.env.VITE_API_URL}/uploads/${product.images[0]}`
      : "/images/placeholder.jpg";

  return (
    <div className="flex items-center justify-between border-b py-3">
      {/*  Product Image */}
      <div className="flex items-center gap-3">
        {product.images && product.images.length > 0 ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
            />
          </div>
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
            No Image
          </div>
        )}

        {/*  Product Info */}
        <div>
          <div className="font-semibold">{product.name || item.productId}</div>
          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
        </div>
      </div>

      {/*  Price + Remove */}
      <div className="flex gap-3 items-center">
        <div className="font-semibold text-pink-600">
          ₹{item.price || product.basePrice || 0}
        </div>
        <button
          onClick={() => onRemove(item.productId)}
          className="text-sm text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
