import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/productos`,
      );

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
