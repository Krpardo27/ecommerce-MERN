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

const Sidebar = ({ categoriaActiva, onChangeCategoria }) => {
  const { categorias, loading } = useProductos();

  if (loading) {
    return (
      <aside className="w-64 p-6 text-zinc-400">Cargando categorías…</aside>
    );
  }

  return (
    <aside
      className="
        w-64 shrink-0
        border-r border-zinc-800
        bg-zinc-950
        p-6
        sticky top-16
        h-[calc(100vh-4rem)]
      "
    >
      <h2
        className="
          text-xs font-semibold
          uppercase tracking-widest
          text-zinc-500
          mb-6
        "
      >
        Categorías
      </h2>

      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onChangeCategoria(null)}
            className={`
              group w-full flex items-center gap-3
              px-3 py-2 rounded-lg text-sm
              transition
              ${
                categoriaActiva === null
                  ? "bg-zinc-800 text-lime-400"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
              }
            `}
          >
            <FiGrid className="text-base opacity-80" />
            <span>Todas</span>
          </button>
        </li>

        {categorias.map((cat) => {
          const Icon = iconBySlug[cat.slug] || FiBox;

          return (
            <li key={cat.id}>
              <button
                onClick={() => onChangeCategoria(cat.slug)}
                className={`
                  group w-full flex items-center gap-3
                  px-3 py-2 rounded-lg text-sm capitalize
                  transition
                  ${
                    categoriaActiva === cat.slug
                      ? "bg-zinc-800 text-lime-400"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 text-base opacity-80 group-hover:scale-110 transitio"
                  }
                `}
              >
                <Icon className="text-base opacity-80" />
                <span>{cat.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 pt-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Urban essentials · curated drops
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
