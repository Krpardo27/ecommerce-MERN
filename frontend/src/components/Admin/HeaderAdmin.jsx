import React from "react";
import { FiBox, FiLogOut, FiMenu, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = ({ onOpenSidebar }) => {
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
              onClick={() => navigate("/admin/productos/crear-producto")}
              className="
      hidden sm:inline-flex
      items-center gap-2
      px-4 py-2
      rounded-xl
      bg-white text-zinc-950
      hover:bg-zinc-200
      transition
      font-semibold
    "
            >
              <FiBox />
              Nuevo producto
            </button>

            {/* 🚪 Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
      inline-flex items-center gap-2
      px-4 py-2
      rounded-xl
      border border-zinc-800
      text-zinc-200
      hover:bg-zinc-900 hover:text-white
      transition
    "
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

export default HeaderAdmin;
