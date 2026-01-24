import axios from "axios";

export const fetchProductos = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/productos`
  );
  return data;
};

export const fetchProductoBySlug = async (slug) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/productos/slug/${slug}`
  );
  return data;
};
