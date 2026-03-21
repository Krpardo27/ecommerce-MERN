import { categories } from "../data/categories";

export const getProductMeta = (producto) => {
  const categoriaObj = categories.find(
    (cat) => cat.key === producto?.categoriaKey,
  );

  const subcategoriaObj = categoriaObj?.subcategorias?.find(
    (sub) => sub.key === producto?.subcategoriaKey,
  );

  return {
    categoriaObj,
    subcategoriaObj,
    categoriaLabel: subcategoriaObj?.nombre || categoriaObj?.nombre || "General",
    categoriaSlug: subcategoriaObj?.key || categoriaObj?.key || "general",
  };
};