import { useSearchParams } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";
import { useProductos } from "../../hooks/useProductos";
import { useEffect, useMemo } from "react";
import ProductsControls from "./ProductsControls";
import SidebarMobile from "../SidebarMobile";
import ProductsEmpty from "./ProductsEmpty";
import Paginator from "../Paginator";
import ProductsGrid from "./ProductsGrid";
import Sidebar from "../Sidebar";

const ProductsView = () => {
  const { productos, loading, error } = useProductos();
  const { showLoader, hideLoader } = useLoading();

  const [params, setParams] = useSearchParams();

  const categoria = params.get("categoria");
  const search = params.get("search") || "";
  const page = Number(params.get("page") || 1);
  const limit = params.get("limit") || 12;

  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading, showLoader, hideLoader]);

  const productosFiltrados = useMemo(() => {
    const q = search.trim().toLowerCase();

    return productos.filter((p) => {
      const matchCategoria = categoria
        ? p?.categoria?.slug === categoria
        : true;

      const matchSearch = q
        ? p?.nombre?.toLowerCase().includes(q)
        : true;

      return matchCategoria && matchSearch;
    });
  }, [productos, categoria, search]);

  const itemsPerPage =
    limit === "all" ? productosFiltrados.length : Number(limit);

  const totalPages = Math.ceil(
    productosFiltrados.length / itemsPerPage
  );

  const productosVisibles = useMemo(() => {
    if (limit === "all") return productosFiltrados;

    const start = (page - 1) * itemsPerPage;
    return productosFiltrados.slice(start, start + itemsPerPage);
  }, [productosFiltrados, page, itemsPerPage, limit]);

  const updateParams = (newParams) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([k, v]) => {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      });
      return next;
    });
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex bg-zinc-950 min-h-screen">
      <Sidebar
        categoriaActiva={categoria}
        onChangeCategoria={(slug) =>
          updateParams({ categoria: slug, page: 1 })
        }
      />

      <main className="flex-1 p-6 space-y-8">
        <ProductsControls
          search={search}
          limit={limit}
          total={productosFiltrados.length}
          visibles={productosVisibles.length}
          onSearch={(v) => updateParams({ search: v, page: 1 })}
          onLimit={(v) => updateParams({ limit: v, page: 1 })}
        />

        <div className="md:hidden">
          <SidebarMobile
            categoriaActiva={categoria}
            onChangeCategoria={(slug) =>
              updateParams({ categoria: slug, page: 1 })
            }
          />
        </div>

        <ProductsGrid
          loading={loading}
          productos={productosVisibles}
          limit={limit}
        />

        {!loading && productosVisibles.length === 0 && (
          <ProductsEmpty />
        )}

        <Paginator
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => updateParams({ page: p })}
        />
      </main>
    </div>
  );
};

export default ProductsView;
