import React, { useState } from "react";
import api from "../utils/api";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    images: [""], //  store URLs directly
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/products", formData);
      console.log(" Product saved:", res.data);

      // Reset form
      setFormData({
        name: "",
        description: "",
        basePrice: "",
        images: [""],
      });
    } catch (error) {
      console.error(" Error adding product:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center"> Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="basePrice"
          placeholder="Price"
          value={formData.basePrice}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Image URL inputs */}
        <div className="space-y-2">
          <label className="font-semibold">Image URLs</label>
          {formData.images.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {url && (
                <img
                  src={url}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded-lg border"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-pink-900 hover:underline text-sm"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
