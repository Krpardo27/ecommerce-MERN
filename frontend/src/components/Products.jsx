import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useProductos } from "../hooks/useProductos";
import { useLoading } from "../hooks/useLoading";
import { useCartContext } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";

import ProductCard from "./ProductCard";
import SidebarMobile from "./SidebarMobile";
import ProductCardSkeleton from "./ProductCardSkeleton";


const Products = () => {
  const { productos, loading, error } = useProductos();
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);
  const { addToCart } = useCartContext();
  const { showToast } = useToast();

  const productosFiltrados = useMemo(() => {
    const q = search.trim().toLowerCase();

    return productos.filter((p) => {
      const matchCategoria =
        categoriaActiva === null
          ? true
          : p?.categoria?.slug === categoriaActiva;

      const matchSearch = q ? p?.nombre?.toLowerCase().includes(q) : true;

      return matchCategoria && matchSearch;
    });
  }, [productos, categoriaActiva, search]);

  const productosVisibles = useMemo(() => {
    return limit === "all"
      ? productosFiltrados
      : productosFiltrados.slice(0, limit);
  }, [productosFiltrados, limit]);

  const { showLoader, hideLoader } = useLoading();

  const handleAddToCart = (producto) => {
    addToCart(producto);

    showToast({
      title: "Añadido al carrito",
      description: producto.nombre,
    });
  };

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading, showLoader, hideLoader]);

  useEffect(() => {
    if (categoriaActiva !== null) {
      showLoader();
      const t = setTimeout(hideLoader, 300);
      return () => clearTimeout(t);
    }
  }, [categoriaActiva, showLoader, hideLoader]);

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

        <div className="md:hidden">
          <SidebarMobile
            categoriaActiva={categoriaActiva}
            onChangeCategoria={setCategoriaActiva}
          />
        </div>

        <section
          className="
    grid gap-6
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
  "
        >
          {loading
            ? Array.from({ length: limit === "all" ? 12 : limit }).map(
                (_, i) => <ProductCardSkeleton key={i} />
              )
            : productosVisibles.map((p) => (
                <ProductCard
                  key={p._id}
                  producto={p}
                  onAddToCart={handleAddToCart}
                />
              ))}
        </section>

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
