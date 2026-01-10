import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProductosProvider } from "./context/ProductsContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductosProvider>
      <RouterProvider router={router} />
    </ProductosProvider>
  </StrictMode>
);
