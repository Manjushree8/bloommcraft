import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", address: "" });

  useEffect(() => {
    loadOrders();
    loadProfile();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
      setForm({ name: res.data.name, address: res.data.address || "" });
    } catch (err) {
      console.error(" Error loading profile:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put("/users/profile", form);
      setUser(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error(" Error updating profile:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/*  Show user name instead of just "Profile" */}
      <h2 className="text-2xl font-semibold mb-6">
        {user ? `Welcome, ${user.name}` : "Profile"}
      </h2>

      {/*  Profile Info */}
      {user && (
        <div className="card p-4 mb-6">
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Your address"
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleUpdate}
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="ml-2 text-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address || "Not set"}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-3 bg-gray-200 px-3 py-1 rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      )}

      {/*  Orders */}
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <div className="card p-3">No orders yet</div>
        ) : (
          orders.map((o) => (
            <div key={o._id} className="card p-3">
              <div className="flex justify-between">
                <div>Order #{o._id}</div>
                <div>{o.status}</div>
              </div>
              <div className="mt-2 text-sm opacity-80">
                Delivery: {new Date(o.deliveryDate).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
