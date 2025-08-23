import { Link } from "react-router-dom";
import { FaGift, FaLeaf, FaClock, FaTruck } from "react-icons/fa";

export default function Home() {
  const features = [
    { icon: <FaLeaf className="text-3xl text-pink-500" />, title: "Fresh Flowers", desc: "We use only the freshest blooms for your garlands." },
    { icon: <FaGift className="text-3xl text-yellow-500" />, title: "Customizable", desc: "Choose flowers, colors, style, size, and message tags." },
    { icon: <FaClock className="text-3xl text-green-500" />, title: "Quick Delivery", desc: "Get your garlands delivered fast and fresh." },
    { icon: <FaTruck className="text-3xl text-purple-500" />, title: "Reliable Service", desc: "Track your orders and enjoy hassle-free service." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 py-12 space-y-16">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-pink-600">BloomCraft — craft your perfect garland</h1>
          <p className="mb-6 text-gray-700 text-lg">Customize floral garlands, select your favorite flowers and colors, and place orders with ease.</p>
          <Link to="/products" className="bg-pink-500 hover:bg-pink-600 transition-colors text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
            Shop Garlands
          </Link>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src="/src/assets/images/banner.jpg" alt="banner" className="w-full h-64 md:h-80 object-cover" />
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10 text-pink-900">Why Choose BloomCraft?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12 bg-gradient-to-r from-pink-100 to-pink-100 rounded-2xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4 text-pink-500">Start Creating Your Dream Garland Today!</h2>
        <Link to="/products" className="bg-pink-800 hover:bg-pink-500 transition-colors text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
