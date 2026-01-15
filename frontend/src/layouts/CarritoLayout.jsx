import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCartContext } from "../hooks/useCart";
import HeaderCarrito from "../components/HeaderCarrito";

const CarritoLayout = () => {
  const { totalItems } = useCartContext();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <HeaderCarrito />
      
      <div className="max-w-7xl mx-auto px-6 pt-6 space-y-6">
        <Breadcrumbs />

        {totalItems === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <p className="text-lg">Tu carrito está vacío</p>
            <p className="text-sm mt-2">
              Agrega productos para continuar con la compra
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default CarritoLayout;
