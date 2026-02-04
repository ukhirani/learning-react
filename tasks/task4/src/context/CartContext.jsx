import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const persistCart = (items) => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        persistCart(updated);
        return updated;
      }
      const updated = [...prev, { ...product, quantity }];
      persistCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      persistCart(updated);
      return updated;
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item,
      );
      persistCart(updated);
      return updated;
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      const q = item.quantity ?? 1;
      if (q <= 1) {
        const updated = prev.filter((i) => i.id !== productId);
        persistCart(updated);
        return updated;
      }
      const updated = prev.map((i) =>
        i.id === productId ? { ...i, quantity: q - 1 } : i,
      );
      persistCart(updated);
      return updated;
    });
  };

  const getQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? (item.quantity ?? 1) : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
