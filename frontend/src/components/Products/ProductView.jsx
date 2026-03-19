import { useSearchParams } from "react-router-dom";
import { useProductos } from "../../hooks/queries/useProductos";
import { useEffect, useMemo } from "react";
import ProductsControls from "./ProductsControls";
import SidebarMobile from "../SidebarMobile";
import ProductsEmpty from "./ProductsEmpty";
import Paginator from "../Paginator";
import ProductsGrid from "./ProductsGrid";
import Sidebar from "../Sidebar";

const ProductView = () => {
  const {
    data: productos = [],
    isLoading: loading,
    isError: error,
  } = useProductos();

  const [params, setParams] = useSearchParams();

  const categoria = params.get("categoria");
  const subcategoria = params.get("subcategoria");
  const search = params.get("search") || "";
  
  const page = Number(params.get("page") || 1);
  const limitParam = params.get("limit") || "12";
  const limit = limitParam === "all" ? "all" : Number(limitParam);

  const productosFiltrados = useMemo(() => {
    if (!Array.isArray(productos)) return [];

    const q = search.trim().toLowerCase();

    return productos.filter((p) => {
      const matchCategoria = !categoria
        ? true
        : p?.categoria?.slug === categoria;

      const matchSubcategoria = !subcategoria
        ? true
        : p?.subcategoria?.slug === subcategoria;

      const matchSearch = q ? p?.nombre?.toLowerCase().includes(q) : true;

      return matchCategoria && matchSubcategoria && matchSearch;
    });
  }, [productos, categoria, subcategoria, search]);

  const itemsPerPage =
    limit === "all" ? productosFiltrados.length : Number(limit);

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const productosVisibles = useMemo(() => {
    if (!Array.isArray(productosFiltrados)) return [];

    if (limit === "all") return productosFiltrados;

    const perPage = Number(limit);
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return productosFiltrados.slice(start, end);
  }, [productosFiltrados, page, limit]);

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
        subcategoriaActiva={subcategoria}
        onChangeCategoria={(slug) =>
          updateParams({
            categoria: slug,
            subcategoria: null,
            page: 1,
          })
        }
        onChangeSubcategoria={(slug) =>
          updateParams({ subcategoria: slug, page: 1 })
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
            subcategoriaActiva={subcategoria}
            onChangeCategoria={(slug) =>
              updateParams({
                categoria: slug,
                subcategoria: null,
                page: 1,
              })
            }
            onChangeSubcategoria={(slug) =>
              updateParams({ subcategoria: slug, page: 1 })
            }
          />
        </div>
        <ProductsGrid
          loading={loading}
          productos={productosVisibles}
          limit={limit}
        />
        {!loading && productosVisibles.length === 0 && <ProductsEmpty />}
        <Paginator
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => updateParams({ page: p })}
        />
      </main>
    </div>
  );
};

export default ProductView;
