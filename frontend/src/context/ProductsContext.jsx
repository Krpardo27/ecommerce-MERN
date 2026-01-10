import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductosContext = createContext(null);

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  console.log("produtos desde CONTEXT", productos);

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProductos = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        if (!isMounted) return;

        setProductos(data);

        // 🔹 categorías desde Mongo (slug único)
        const categoriasUnicas = [
          ...new Map(
            data
              .filter((p) => p.categoria)
              .map((p) => [p.categoria.slug, p.categoria])
          ).values(),
        ];

        setCategorias(categoriasUnicas);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err.response?.data?.mensaje ||
            err.message ||
            "Error al cargar productos"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProductosContext.Provider
      value={{
        productos,
        categorias,
        loading,
        error,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
