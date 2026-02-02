import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, imagenes }) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      imagenes.forEach((file) => {
        formData.append("imagenes", file);
      });

      const response = await api.post("/admin/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};
