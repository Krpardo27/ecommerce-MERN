import { Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

const HeaderCarrito = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Título */}
        <div className="flex items-center gap-3">
          <FiShoppingBag className="text-lime-400" />
          <span className="font-semibold tracking-wide">
            Checkout
          </span>
        </div>

        {/* Acción */}
        <Link
          to="/categorias"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
        >
          <FiArrowLeft />
          Seguir comprando
        </Link>
      </div>
    </header>
  );
};

export default HeaderCarrito;
