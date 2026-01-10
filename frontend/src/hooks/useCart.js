import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return ctx;
};