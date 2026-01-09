import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition";

const active = "bg-black text-white";

const inactive = "text-gray-700 hover:bg-gray-100";

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          Shop<span className="text-indigo-600">X</span>
        </NavLink>

        {/* NAV */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Categorías
          </NavLink>

          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Carrito 🛒
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
