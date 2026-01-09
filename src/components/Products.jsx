import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useProductos } from "../hooks/useProductos";

const Products = () => {
  const { productos, loading, error } = useProductos();

  // UI state (correcto que estén acá)
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);

  const productosFiltrados = useMemo(() => {
    const q = search.trim().toLowerCase();

    return productos.filter((p) => {
      const matchCategoria =
        categoriaActiva === null ? true : p?.category?.slug === categoriaActiva;

      const matchSearch = q ? p?.title?.toLowerCase().includes(q) : true;

      return matchCategoria && matchSearch;
    });
  }, [productos, categoriaActiva, search]);

  const productosVisibles = useMemo(() => {
    return limit === "all"
      ? productosFiltrados
      : productosFiltrados.slice(0, limit);
  }, [productosFiltrados, limit]);

  if (loading) {
    return <div className="p-6 text-zinc-400">Cargando productos…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex bg-zinc-950 min-h-screen">
      {/* ASIDE */}
      <Sidebar
        categoriaActiva={categoriaActiva}
        onChangeCategoria={setCategoriaActiva}
      />

      {/* MAIN — SOLO UNO */}
      <main className="flex-1 p-6 space-y-8">
        {/* CONTROLES */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Buscador */}
          <div className="relative w-full md:max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos…"
              className="
                w-full rounded-2xl
                bg-zinc-900 border border-zinc-800
                pl-10 pr-10 py-2.5 text-sm
                text-zinc-100 placeholder:text-zinc-500
                outline-none
                focus:border-lime-400/40
              "
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* Filtro cantidad */}
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span>
              Mostrando{" "}
              <span className="text-zinc-100 font-medium">
                {productosVisibles.length}
              </span>{" "}
              de{" "}
              <span className="text-zinc-100 font-medium">
                {productosFiltrados.length}
              </span>
            </span>

            <select
              value={limit}
              onChange={(e) =>
                setLimit(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="
                bg-zinc-900 border border-zinc-800
                rounded-lg px-3 py-2
                text-zinc-100
                outline-none
                focus:border-lime-400/40
              "
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value="all">Todos</option>
            </select>
          </div>
        </section>

        {/* GRID */}
        <section
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {productosVisibles.map((p) => (
            <article
              key={p.id}
              className="
                group relative
                bg-zinc-900
                border border-zinc-800
                rounded-2xl
                overflow-hidden
                transition
                hover:border-zinc-700
              "
            >
              {/* Imagen */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  loading="lazy"
                  className="
                    h-full w-full object-cover
                    transition duration-500
                    group-hover:scale-105
                  "
                />
                <div
                  className="
                    absolute top-3 right-3
                    bg-zinc-950/80 backdrop-blur
                    text-xs font-semibold
                    px-3 py-1 rounded-full
                    text-lime-400
                  "
                >
                  ${p.price}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-medium text-zinc-100 line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  {p.category?.name}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* EMPTY */}
        {productosVisibles.length === 0 && (
          <section className="text-sm text-zinc-500">
            No se encontraron productos.
          </section>
        )}
      </main>
    </div>
  );
};

export default Products;
