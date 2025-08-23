import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, remove, clear } = useContext(CartContext);
  const nav = useNavigate();
  const total = items.reduce((s, i) => s + (i.basePrice || 0) * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {items.length === 0 ? (
        <div className="card">Cart is empty. <Link to="/products" className="text-primary">Shop now</Link></div>
      ) : (
        <>
          <div className="card">
            {items.map(it => <CartItem key={it.productId} item={it} onRemove={remove} />)}
            <div className="flex justify-between mt-4">
              <div className="font-semibold">Total: ₹{total}</div>
              <div className="flex gap-2">
                <button onClick={() => nav("/checkout")} className="bg-primary text-white px-4 py-2 rounded-2xl">Checkout</button>
                <button onClick={() => clear()} className="px-4 py-2 rounded-2xl border">Clear</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
