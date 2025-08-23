import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import AddProduct from "./AddProduct";

//  Animated Counter Hook
function useCountUp(target, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target || 1));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Animated values
  const usersCount = useCountUp(stats.totalUsers);
  const ordersCount = useCountUp(stats.totalOrders);
  const revenueCount = useCountUp(Math.floor(stats.totalRevenue));

  // Fetch dashboard stats
  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      //  Fix totalPrice if missing
      const ordersWithPrice = data.map(o => ({
        ...o,
        totalPrice: o.totalPrice && o.totalPrice > 0 
          ? o.totalPrice 
          : o.products?.reduce((sum, p) => sum + (p.productId?.basePrice || 0) * (p.quantity || 1), 0)
      }));
      setOrders(ordersWithPrice);
      setRecentOrders(ordersWithPrice.slice(-5).reverse());
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchOrders();
    fetchProducts();
    fetchCustomers();
  }, []);

  // Update order status
  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
      fetchDashboard();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
      fetchDashboard();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      fetchCustomers();
      fetchDashboard();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["dashboard", "products", "orders", "customers"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "products") fetchProducts();
              if (tab === "orders") fetchOrders();
              if (tab === "customers") fetchCustomers();
            }}
            className={`px-4 py-2 rounded-xl font-semibold transition duration-300 shadow-md ${
              activeTab === tab ? "bg-blue-600 text-white scale-105" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div>
          <h2 className="text-2xl font-bold mb-4"> Admin Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg">Total Users</h3>
              <p className="text-3xl font-bold">{usersCount}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg">Total Orders</h3>
              <p className="text-3xl font-bold">{ordersCount}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg">Total Revenue</h3>
              <p className="text-3xl font-bold">₹{revenueCount.toLocaleString()}</p>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <ul className="space-y-2">
              {recentOrders.map((order) => (
                <motion.li
                  key={order._id}
                  className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>
                    Order #{order._id.slice(-5)} — {order.userId?.name || "Unknown"} — ₹{order.totalPrice}
                  </span>
                  <span
                    className={`font-semibold ${
                      order.status === "delivered" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recent orders found</p>
          )}
        </div>
      )}

      {/* Products */}
      {activeTab === "products" && (
        <div>
          <h2 className="text-2xl font-bold mb-4"> Manage Products</h2>
          <AddProduct />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">All Products</h3>
            <table className="min-w-full bg-white border border-gray-300 text-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{p.name}</td>
                    <td className="py-2 px-4 border-b">₹{p.basePrice}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div>
          <h2 className="text-2xl font-bold mb-4"> Manage Orders</h2>
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Total Price</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">#{o._id.slice(-5)}</td>
                  <td className="py-2 px-4 border-b">{o.userId?.name || "Unknown"}</td>
                  <td className="py-2 px-4 border-b">₹{o.totalPrice}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                      className="border rounded px-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteOrder(o._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customers */}
      {activeTab === "customers" && (
        <div>
          <h2 className="text-2xl font-bold mb-4"> Manage Customers</h2>
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{c.name}</td>
                  <td className="py-2 px-4 border-b">{c.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteCustomer(c._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
