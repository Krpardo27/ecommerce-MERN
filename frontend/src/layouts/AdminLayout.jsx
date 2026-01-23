// src/admin/AdminLayout.jsx
import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { to: "/admin", label: "Dashboard", icon: <FiHome /> },
      { to: "/admin/products", label: "Productos", icon: <FiBox /> },
      { to: "/admin/categories", label: "Categorías", icon: <FiGrid /> },
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

const Topbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/70 backdrop-blur border-b border-zinc-800/70">
      <div className="px-4 lg:px-6 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition"
          aria-label="Abrir sidebar"
        >
          <FiMenu />
        </button>

        <div className="flex-1 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-950">
            <FiSearch className="text-zinc-400" />
            <input
              className="bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-[240px]"
              placeholder="Buscar (UI placeholder)"
              disabled
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/admin/products/new")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition font-semibold"
            >
              <FiBox />
              Nuevo producto
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-white transition"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
