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
import AdminLogin from "./views/admin/AdminLogin";
import AdminProtectedRoute from "./layouts/AdminProtectedRoute";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AdminNewProduct from "./views/admin/AdminNewProduct";
import AdminProductos from "./views/admin/AdminProductos";
import CategoriasAdmin from "./views/admin/CategoriasAdmin";
import ProductoEditar from "./components/Admin/ProductoEditar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EcommerceLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "productos", element: <Products /> },
      { path: "producto/:categoria/:slug", element: <ProductDetail /> },
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
    children: [
      {
        element: <AdminAuthLayout />,
        children: [{ path: "login", element: <AdminLogin /> }],
      },

      {
        element: <AdminProtectedRoute />,
        children: [
          {
            element: <AdminPanelLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "productos", element: <AdminProductos /> },
              {
                path: "productos/crear-producto",
                element: <AdminNewProduct />,
              },
              {
                path: "productos/:id/editar",
                element: <ProductoEditar isEdit />,
              },
              { path: "categorias", element: <CategoriasAdmin /> },
            ],
          },
        ],
      },

      { index: true, element: <Navigate to="/admin/login" replace /> },
    ],
  },

  {
    path: "carrito",
    element: <CarritoLayout />,
    children: [{ index: true, element: <Carrito /> }],
  },
]);
