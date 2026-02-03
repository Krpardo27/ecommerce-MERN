import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Carrito from "./views/Carrito";
import Nosotros from "./views/Nosotros";
import Blog from "./views/Blog";
import Contacto from "./views/Contacto";
import Products from "./views/Products";
import CarritoLayout from "./layouts/CarritoLayout";
import Productos from "./views/admin/Productos";
import CategoriasAdmin from "./views/admin/CategoriasAdmin";
import ProductoNuevo from "./views/admin/ProductoNuevo";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Perfil from "./views/user/Perfil";
import { ToastProvider } from "./context/ToastContext";
import ProductDetail from "./views/ProductDetail ";
import MisCompras from "./views/user/MisCompras";
import Direcciones from "./views/user/Direcciones";
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminLogin from "./views/admin/AdminLogin";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AdminProtectedRoute from "./layouts/AdminProtectedRoute";
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import EcommerceLayout from "./layouts/EcommerceLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";

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
            <ProfileLayout />
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
    children: [
      {
        element: (
          <ToastProvider>
            <AdminAuthLayout />
          </ToastProvider>
        ),
        children: [
          { path: "login", element: <AdminLogin /> },
        ],
      },
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            element: (
              <ToastProvider>
                <AdminPanelLayout />
              </ToastProvider>
            ),
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "productos", element: <Productos /> },
              { path: "categorias", element: <CategoriasAdmin /> },
              { path: "productos/crear-producto", element: <ProductoNuevo /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "carrito",
    element: <CarritoLayout />,
    children: [{ index: true, element: <Carrito /> }],
  },
]);
