import Products from "../models/Products.js";

export const obtenerProductos = async (req, res) => {
  const productos = await Products.find({ activo: true })
    .populate("categoria", "nombre slug imagen")
    .sort({ createdAt: -1 });

  res.json(productos);
};

export const obtenerProductoPorSlug = async (req, res) => {
  const producto = await Products.findOne({ slug: req.params.slug }).populate(
    "categoria",
    "nombre slug imagen"
  );

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(producto);
};
