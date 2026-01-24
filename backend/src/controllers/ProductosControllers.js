import Productos from "../models/Productos.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find().lean();

    return res.status(200).json(productos);
  } catch (error) {
    console.error("❌ getProductos error:", error);
    return res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

export const obtenerProductoPorSlug = async (req, res) => {
  const producto = await Productos.findOne({ slug: req.params.slug }).populate(
    "categoria",
    "nombre slug imagen",
  );

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(producto);
};
