import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios";

export const useProducto = (id) =>
  useQuery({
    queryKey: ["producto", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/productos/${id}`);
      return data;
    },
  });
