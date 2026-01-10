import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // ✅ Inicialización lazy (SIN useEffect)
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ addToCart sin side-effects raros
  const addToCart = (producto) => {
    let existed = false;

    setItems((prev) => {
      const existing = prev.find((p) => p._id === producto._id);

      if (existing) {
        existed = true;
        return prev.map((p) =>
          p._id === producto._id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...producto, qty: 1 }];
    });

    return existed;
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCart = () => setItems([]);

  // ✅ Persistencia (ESTE efecto sí es correcto)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((acc, p) => acc + p.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, p) => acc + p.precio * p.qty, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
