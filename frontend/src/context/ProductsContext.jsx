import { createContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductos } from "../services/productos.api";

export const ProductosContext = createContext(null);

export const ProductosProvider = ({ children }) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: fetchProductos,
  });

  // 🔹 solo productos activos
  const productosActivos = useMemo(() => data.filter((p) => p?.activo), [data]);

  // 🔹 categorías únicas desde productos
  const categorias = useMemo(() => {
    return [
      ...new Map(
        productosActivos
          .filter((p) => p?.categoria)
          .map((p) => [p.categoria.slug, p.categoria])
      ).values(),
    ];
  }, [productosActivos]);

  return (
    <ProductosContext.Provider
      value={{
        productos: productosActivos,
        categorias,
        loading: isLoading,
        error: isError ? error.message : null,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
