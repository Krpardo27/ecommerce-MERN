import { useState } from "react";
import { FiBox, FiExternalLink, FiLogOut, FiMenu, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import FullscreenLoader from "../FullscreenLoader";

const MIN_LOADING_TIME = 2500; 

const HeaderAdmin = ({ onOpenSidebar }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || "/";

  const handleLogout = () => {
    setLoggingOut(true);

    localStorage.removeItem("AUTH_TOKEN");

    queryClient.clear();

    setTimeout(() => {
      navigate("/admin/login", { replace: true });
    }, MIN_LOADING_TIME);
  };

  return (
    <>
      <FullscreenLoader isVisible={loggingOut} label="Cerrando sesión…" />

      <header className="sticky top-0 z-30 h-16 bg-zinc-950/70 backdrop-blur border-b border-zinc-800/70">
        <div className="h-full px-4 lg:px-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition"
            aria-label="Abrir sidebar"
          >
            <FiMenu />
          </button>

          <div className="flex-1 flex items-center gap-3">
            {/* SEARCH */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl border border-zinc-800 bg-zinc-950">
              <FiSearch className="text-zinc-400" />
              <input
                className="bg-transparent py-1 outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-[240px]"
                placeholder="Buscar"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* IR A LA WEB */}
              <a
                href={PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 hover:text-white transition font-semibold"
              >
                <FiExternalLink />
                <span className="hidden sm:inline">Ir a la web</span>
              </a>

              {/* NUEVO PRODUCTO */}
              <button
                type="button"
                onClick={() => navigate("/admin/productos/crear-producto")}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition font-semibold"
              >
                <FiBox />
                Nuevo producto
              </button>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-white transition disabled:opacity-50"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
