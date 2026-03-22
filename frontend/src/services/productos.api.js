import api from "../config/axios";

export const fetchProductos = async () => {
  const { data } = await api.get("/productos");
  return data;
};

export const fetchProductoBySlug = async (slug) => {
  const { data } = await api.get(`/productos/slug/${slug}`);
  return data;
};
