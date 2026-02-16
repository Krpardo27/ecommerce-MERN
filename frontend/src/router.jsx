import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Carrito from "./views/Carrito";
import Nosotros from "./views/Nosotros";
import Blog from "./views/Blog";
import Contacto from "./views/Contacto";
import Products from "./views/Products";
import CarritoLayout from "./layouts/CarritoLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ProductDetail from "./views/ProductDetail ";
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import EcommerceLayout from "./layouts/EcommerceLayout";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EcommerceLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "productos", element: <Products /> },
      { path: "producto/:slug", element: <ProductDetail /> },
      { path: "categorias", element: <Categorias /> },
      { path: "blog", element: <Blog /> },
      { path: "contacto", element: <Contacto /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
    ],
  },

  {
    path: "admin",
    element: <AdminPanelLayout />,
    children: [{ path: "dashboard", element: <AdminDashboard /> }],
  },

  {
    path: "carrito",
    element: <CarritoLayout />,
    children: [{ index: true, element: <Carrito /> }],
  },
]);
