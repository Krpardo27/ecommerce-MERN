import {
  FiGrid,
  FiMousePointer,
  FiCpu,
  FiHeadphones,
  FiVideo,
  FiBox,
} from "react-icons/fi";
import { categories } from "../data/categories";

const iconBySlug = {
  perifericos: FiMousePointer,
  "componentes-pc": FiCpu,
  "audio-gamer": FiHeadphones,
  streaming: FiVideo,
  "sillas-gamer": FiBox,
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
              !categoriaActiva
                ? "bg-zinc-800 text-lime-400"
                : "text-zinc-300 hover:bg-zinc-900"
            }`}
          >
            <FiGrid />
            Todas
          </button>
        </li>

        {categorias.map((c) => {
          const Icon = iconBySlug[c.key] || FiBox;

          return (
            <li key={c.key}>
              <button
                onClick={() => onChangeCategoria(c.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  categoriaActiva === c.key
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
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 p-6 sticky top-16 h-[calc(100vh-4rem)]">
      <SidebarContent
        categorias={categories}
        categoriaActiva={categoriaActiva}
        onChangeCategoria={onChangeCategoria}
      />
    </aside>
  );
};

export default Sidebar;
export { SidebarContent };
