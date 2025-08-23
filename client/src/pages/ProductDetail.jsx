import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import CustomizationForm from "../components/CustomizationForm";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { add } = useContext(CartContext);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };
const handleAdd = (payload) => {
  add(
    {
      productId: product._id,
      name: product.name,
      basePrice: product.basePrice,
      images: product.images,
    },
    payload.customization,   
    payload.quantity         
  );
  alert("Added to cart");
};



  if (!product) return <Loader />;

  // Construct the image URL
  const imageUrl = product.images?.[0] 
    ? (product.images[0].startsWith('http') 
        ? product.images[0] 
        : `${import.meta.env.VITE_API_URL}/uploads/${product.images[0]}`)
    : "/src/assets/images/placeholder.jpg";

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/src/assets/images/placeholder.jpg";
            }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 opacity-80">{product.description}</p>
          <div className="mt-4 text-lg font-semibold">₹{product.basePrice}</div>
          <div className="mt-6">
            <CustomizationForm onAdd={handleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
}