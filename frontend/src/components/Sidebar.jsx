import {
  FiGrid,
  FiShoppingBag,
  FiCpu,
  FiHome,
  FiWatch,
  FiBox,
} from "react-icons/fi";
import { useProductos } from "../hooks/useProductos";

const iconBySlug = {
  moda: FiShoppingBag,
  electronics: FiCpu,
  furniture: FiHome,
  shoes: FiWatch,
  miscellaneous: FiBox,
};

const SidebarContent = ({ categorias, categoriaActiva, onChangeCategoria }) => {
  return (
    <>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
        Categorías
      </h2>

      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onChangeCategoria(null)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
              categoriaActiva === null
                ? "bg-zinc-800 text-lime-400"
                : "text-zinc-300 hover:bg-zinc-900"
            }`}
          >
            <FiGrid />
            Todas
          </button>
        </li>

        {categorias.map((c) => {
          const Icon = iconBySlug[c.slug] || FiBox;

          return (
            <li key={c._id}>
              <button
                onClick={() => onChangeCategoria(c.slug)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition capitalize ${
                  categoriaActiva === c.slug
                    ? "bg-zinc-800 text-lime-400"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                <Icon />
                {c.nombre}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 pt-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">
          Urban essentials · curated drops
        </p>
      </div>
    </>
  );
};

const Sidebar = ({ categoriaActiva, onChangeCategoria }) => {
  const { categorias, loading } = useProductos();

  if (loading) {
    return <aside className="w-64 p-6 text-zinc-400">Cargando…</aside>;
  }

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 p-6 sticky top-16 h-[calc(100vh-4rem)]">
      <SidebarContent
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onChangeCategoria={onChangeCategoria}
      />
    </aside>
  );
};

export default Sidebar;
export { SidebarContent };
