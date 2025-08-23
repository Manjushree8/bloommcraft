import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  FaShoppingCart, 
  FaUser, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaLeaf, 
  FaBoxOpen,   
  FaTools      
} from "react-icons/fa";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    nav("/");
    setIsOpen(false);
  };

  return (
    <header className="py-4 shadow-md bg-gradient-to-r from-pink-400 to-pink-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-pink-600 font-bold transition-transform duration-300 group-hover:rotate-12">
            <FaLeaf className="text-lg" />
          </div>
          <div className="text-xl font-semibold tracking-wide">BloomCraft</div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/products" className="flex items-center gap-2 font-semibold hover:text-yellow-200">
            <FaBoxOpen /> Products
          </Link>
          <Link to="/cart" className="flex items-center gap-2 font-semibold hover:text-yellow-200">
            <FaShoppingCart /> Cart
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="flex items-center gap-2 font-semibold hover:text-yellow-200">
                  <FaTools /> Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 font-semibold hover:text-yellow-200">
                <FaUser /> Profile
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 font-semibold hover:text-yellow-200">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-sm hover:text-yellow-200">
              <FaSignInAlt /> Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-400 px-6 py-4 space-y-4 text-white shadow-lg">
          <Link to="/products" className="block" onClick={() => setIsOpen(false)}>
            <FaBoxOpen className="inline mr-2" /> Products
          </Link>
          <Link to="/cart" className="block" onClick={() => setIsOpen(false)}>
            <FaShoppingCart className="inline mr-2" /> Cart
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="block" onClick={() => setIsOpen(false)}>
                  <FaTools className="inline mr-2" /> Admin
                </Link>
              )}
              <Link to="/profile" className="block" onClick={() => setIsOpen(false)}>
                <FaUser className="inline mr-2" /> Profile
              </Link>
              <button onClick={handleLogout} className="block w-full text-left">
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block" onClick={() => setIsOpen(false)}>
              <FaSignInAlt className="inline mr-2" /> Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
