import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";  
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, clear } = useContext(CartContext);
  const { user } = useContext(AuthContext); 
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const nav = useNavigate();

  const placeOrder = async () => {
    if (!address || !deliveryDate) return alert("Address & date required");
    if (!user?._id) return alert("User not logged in");

    const body = {
      userId: user._id,
      products: items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        customization: {
          flowerType: i.customization?.flowerType || "",
          colorScheme: i.customization?.colorScheme || "",
          style: i.customization?.style || "",
          accessories: i.customization?.accessories || [],
          size: i.customization?.size || "",
          messageTag: i.customization?.messageTag || "",
        }
      })),
      address,
      deliveryDate
    };

    try {
      await api.post("/orders", body);
      alert("Order placed");
      clear();
      nav("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="card mb-4">
        <label className="block mb-2">Delivery Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
        <label className="block mb-2 mt-3">Delivery Date</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full rounded-xl border p-2"
        />
        <div className="mt-4 flex justify-between">
          <div>
            Total: ₹{items.reduce((s, i) => s + (i.basePrice || 0) * i.quantity, 0)}
          </div>
          <button
            onClick={placeOrder}
            className="bg-primary text-white px-4 py-2 rounded-2xl"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
