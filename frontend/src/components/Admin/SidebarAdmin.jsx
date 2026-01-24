import React, { useMemo } from "react";
import { FiBox, FiGrid, FiHome, FiX } from "react-icons/fi";
import { useLocation, NavLink } from "react-router-dom";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const SidebarAdmin = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { to: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
      { to: "/admin/productos", label: "Productos", icon: <FiBox /> },
      { to: "/admin/categorias", label: "Categorías", icon: <FiGrid /> },
    ],
    [],
  );

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden",
          isOpen ? "block" : "hidden",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed z-50 lg:static lg:z-auto",
          "h-full w-[280px] bg-zinc-950 text-zinc-100",
          "border-r border-zinc-800/70",
          "transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-zinc-800/70 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-400">Admin Panel</span>
            <span className="text-lg font-semibold tracking-tight">
              Gamer Store
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition"
            aria-label="Cerrar sidebar"
          >
            <FiX />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3">
          <div className="text-xs text-zinc-500 px-3 py-2">Navegación</div>

          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                      "border border-transparent transition",
                      isActive
                        ? "bg-zinc-900 border-zinc-800 text-white"
                        : "text-zinc-300 hover:bg-zinc-900/60 hover:text-white",
                    )
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Indicador ruta */}
          <div className="mt-4 px-3">
            <div className="text-[11px] text-zinc-500">Ruta actual</div>
            <div className="mt-1 text-xs text-zinc-300 truncate">
              {location.pathname}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-zinc-800/70">
          <div className="text-xs text-zinc-500">Estado</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm text-zinc-300">Sesión Admin</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Activa
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
