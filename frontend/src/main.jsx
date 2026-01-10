import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProductosProvider } from "./context/ProductsContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { LoadingProvider } from "./context/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <CartProvider>
        <ProductosProvider>
          <RouterProvider router={router} />
        </ProductosProvider>
      </CartProvider>
    </LoadingProvider>
  </StrictMode>
);
