import Categoria from "../models/Categorias.js";

export const obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.find().sort({ nombre: 1 });
  res.json(categorias);
};

export const obtenerCategoriaPorSlug = async (req, res) => {
  const categoria = await Categoria.findOne({ slug: req.params.slug });

  if (!categoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  res.json(categoria);
};

export const crearCategoria = async (req, res) => {
  const { nombre, slug, imagen } = req.body;

  if (!nombre || !slug || !imagen) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  const existe = await Categoria.findOne({ slug });
  if (existe) {
    return res.status(400).json({ mensaje: "La categoría ya existe" });
  }

  const categoria = await Categoria.create({
    nombre,
    slug,
    imagen,
  });

  res.status(201).json(categoria);
};
