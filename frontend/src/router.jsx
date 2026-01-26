import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Carrito from "./views/Carrito";
import Nosotros from "./views/Nosotros";
import Blog from "./views/Blog";
import Contacto from "./views/Contacto";
import Products from "./views/Products";
import CarritoLayout from "./layouts/CarritoLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./views/admin/Dashboard";
import Productos from "./views/admin/Productos";
import CategoriasAdmin from "./views/admin/CategoriasAdmin";
import ProductoNuevo from "./views/admin/ProductoNuevo";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import Perfil from "./views/user/Perfil";
import { ToastProvider } from "./context/ToastContext";
import ProductDetail from "./views/ProductDetail ";
import MisCompras from "./views/user/MisCompras";
import Direcciones from "./views/user/Direcciones";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    children: [
      {
        element: (
          <ToastProvider>
            <AuthLayout />
          </ToastProvider>
        ),
        children: [
          { path: "login", element: <LoginView /> },
          { path: "register", element: <RegisterView /> },
        ],
      },
      {
        path: "profile",
        element: (
          <ToastProvider>
            <UserLayout />
          </ToastProvider>
        ),
        children: [
          { index: true, element: <Perfil /> },
          {
            path: "compras",
            element: <MisCompras />,
          },
          {
            path: "direcciones",
            element: <Direcciones />,
          },
        ],
      },
    ],
  },

  {
    path: "admin",
    element: (
      <ToastProvider>
        <AdminLayout />
      </ToastProvider>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "productos", element: <Productos /> },
      { path: "categorias", element: <CategoriasAdmin /> },
      { path: "productos/crear-producto", element: <ProductoNuevo /> },
    ],
  },

  {
    path: "carrito",
    element: <CarritoLayout />,
    children: [{ index: true, element: <Carrito /> }],
  },
]);
