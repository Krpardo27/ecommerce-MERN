import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Carrito from "./views/Carrito";
import Nosotros from "./views/Nosotros";
import Blog from "./views/Blog";
import Contacto from "./views/Contacto";
import Products from "./views/Products";
import CarritoLayout from "./layouts/CarritoLayout";
import ProductDetail from "./views/ProductDetail ";

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
        path: "nosotros",
        element: <Nosotros />,
      },
      {
        path: "productos",
        element: <Products />,
      },
      {
        path: "producto/:slug",
        element: <ProductDetail />,
      },
      {
        path: "categorias",
        element: <Categorias />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contacto",
        element: <Contacto />,
      },
    ],
  },
  {
    path: "carrito",
    element: <CarritoLayout />,
    children: [
      {
        index: true,
        element: <Carrito />,
      },
    ],
  },
]);
