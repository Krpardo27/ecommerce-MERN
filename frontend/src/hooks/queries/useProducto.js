import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios";

export const useProducto = (slug) =>
  useQuery({
    queryKey: ["producto", slug],
    queryFn: async () => {
      const { data } = await api.get(`/productos/slug/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
