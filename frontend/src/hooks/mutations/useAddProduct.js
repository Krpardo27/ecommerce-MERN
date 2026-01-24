import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, imagenes }) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      imagenes.forEach((file) => {
        formData.append("imagenes", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/add-product`,
        formData,
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};
