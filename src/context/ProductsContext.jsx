import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductosContext = createContext(null);

const API_URL = "https://api.escuelajs.co/api/v1/products";

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProductos = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(API_URL);

        if (!isMounted) return;

        setProductos(data);

        const categoriasUnicas = [
          ...new Map(data.map((p) => [p.category.id, p.category])).values(),
        ];

        setCategorias(categoriasUnicas);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err.response?.data?.message ||
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