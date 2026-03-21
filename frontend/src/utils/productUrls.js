export const productUrls = (producto) => {
  const categoria =
    producto?.subcategoriaKey || producto?.categoriaKey || "general";

  return `/producto/${categoria}/${producto.slug}`;
};

export const buildCategoryUrl = (categoriaKey) => {
  return `/categoria/${categoriaKey}`;
};

export const buildSubcategoryUrl = (categoriaKey, subcategoriaKey) => {
  return `/categoria/${categoriaKey}/${subcategoriaKey}`;
};
