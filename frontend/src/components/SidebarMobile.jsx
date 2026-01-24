import { FiX, FiSliders } from "react-icons/fi";
import { useProductos } from "../hooks/queries/useProductos";
import { useState } from "react";
import { SidebarContent } from "./Sidebar";

const SidebarMobile = ({ categoriaActiva, onChangeCategoria }) => {
  const { categorias } = useProductos();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100"
      >
        <FiSliders />
        Filtrar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <aside className="absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-zinc-100">
                Filtros
              </span>
              <button onClick={() => setOpen(false)}>
                <FiX className="text-zinc-400" />
              </button>
            </div>

            <SidebarContent
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              onChangeCategoria={(slug) => {
                onChangeCategoria(slug);
                setOpen(false);
              }}
            />
          </aside>
        </div>
      )}
    </>
  );
};

export default SidebarMobile;
