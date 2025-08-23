import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state with data from localStorage if it exists
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Update localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items]);

  const add = (prod, customization = {}, qty = 1) => {
    const productId = prod._id || prod.productId;

     const requiredCustomizationFields = ['flowerType', 'colorScheme', 'style', 'size'];
  const isCustomizationValid = requiredCustomizationFields.every(field => customization[field]);

    if (!isCustomizationValid) {
      return alert("All customization fields are required.");
    }

    setItems((s) => {
      const found = s.find((i) => i.productId === productId);

      if (found) {
        return s.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [
        ...s,
        {
          productId,
          name: prod.name,
          price: prod.price,
          basePrice: prod.basePrice,
          quantity: qty,
          customization,
           images: prod.images,
        },
      ];
    });
  };

  const remove = (productId) =>
    setItems((s) => s.filter((i) => i.productId !== productId));

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};
