import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Carrito from "./views/Carrito";
import Products from "./components/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categorias",
        element: <Categorias />,
      },
      {
        path: "carrito",
        element: <Carrito />,
      },
    ],
  },
]);
