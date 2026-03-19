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

const SidebarContent = ({
  categorias,
  categoriaActiva,
  subcategoriaActiva,
  onChangeCategoria,
  onChangeSubcategoria,
}) => {
  return (
    <>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
        Categorías
      </h2>

      <ul className="space-y-1">
        {/* TODAS */}
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
          const active = categoriaActiva === c.slug;

          return (
            <li key={c.key}>
              {/* CATEGORIA */}
              <button
                onClick={() => onChangeCategoria(c.slug)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-zinc-800 text-lime-400"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                <Icon />
                {c.nombre}
              </button>

              {/* SUBCATEGORIAS */}
              {active && c.subcategorias?.length > 0 && (
                <ul className="ml-7 mt-2 space-y-1 border-l border-zinc-800 pl-3">
                  {c.subcategorias.map((sub) => (
                    <li key={sub.key}>
                      <button
                        onClick={() => onChangeSubcategoria(sub.slug)}
                        className={`w-full text-left text-sm px-2 py-1 rounded transition ${
                          subcategoriaActiva === sub.slug
                            ? "text-lime-400"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {sub.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Sidebar = ({
  categoriaActiva,
  subcategoriaActiva,
  onChangeCategoria,
  onChangeSubcategoria,
}) => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 p-6 sticky top-16 h-[calc(100vh-4rem)]">
      <SidebarContent
        categorias={categories}
        categoriaActiva={categoriaActiva}
        subcategoriaActiva={subcategoriaActiva}
        onChangeCategoria={onChangeCategoria}
        onChangeSubcategoria={onChangeSubcategoria}
      />
    </aside>
  );
};

export default Sidebar;
export { SidebarContent };
