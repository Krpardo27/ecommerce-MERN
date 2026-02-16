import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data, imagenes }) => {
      const form = new FormData();
      form.append("data", JSON.stringify(data));

      imagenes?.forEach((img) => {
        if (img instanceof File) form.append("imagenes", img);
      });

      const { data: updated } = await api.put(`/productos/${id}`, form);
      return updated;
    },

    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["productos"], (old = []) =>
        old.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)),
      );

      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};
