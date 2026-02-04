import React, { useMemo } from "react";
import { FiBox, FiGrid, FiHome, FiX } from "react-icons/fi";
import { useLocation, NavLink } from "react-router-dom";
import { useAdminProfile } from "../../hooks/queries/useAdminProfile";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const SidebarAdmin = ({ isOpen, onClose }) => {
  const { data: admin, isLoading, isError } = useAdminProfile();

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
      {/* Overlay mobile */}
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
          "min-h-screen w-[280px] bg-zinc-950 text-zinc-100",
          "border-r border-zinc-800/70",
          "flex flex-col",
          "transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10
    h-16 px-5
    bg-zinc-950
    border-b border-zinc-800/70
    flex items-center justify-between"
        >
          <div className="flex flex-col leading-tight">
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
        <nav className="p-3 flex-1 overflow-y-auto">
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

          {/* Ruta actual */}
          <div className="mt-4 px-3">
            <div className="text-[11px] text-zinc-500">Ruta actual</div>
            <div className="mt-1 text-xs text-zinc-300 truncate">
              {location.pathname}
            </div>
          </div>
        </nav>

        {/* Footer / Admin */}
        <div className="p-4 border-t border-zinc-800/70">
          {isLoading ? (
            <>
              <div className="text-xs text-zinc-500">Sesión</div>
              <div className="mt-2 h-4 w-32 rounded bg-zinc-800 animate-pulse" />
            </>
          ) : isError || !admin ? (
            <>
              <div className="text-xs text-zinc-500">Sesión</div>
              <div className="mt-1 text-sm text-red-400">Sesión inválida</div>
            </>
          ) : (
            <>
              <div className="text-xs text-zinc-500">Administrador</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold">
                  {admin.nombre?.[0]?.toUpperCase() ?? "A"}
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="text-sm font-medium text-zinc-200 truncate">
                    {admin.nombre}
                  </div>
                  <div className="text-xs text-zinc-400 truncate">
                    {admin.email}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Estado</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Activa
                </span>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
