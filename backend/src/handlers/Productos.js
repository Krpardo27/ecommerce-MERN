import { validationResult } from "express-validator";
import Producto from "../models/Producto.js";
import { generateUniqueSku } from "../utils/generateUniqueSku.js";
import { generateUniqueSlug } from "../utils/generateUniqueSlug.js";
import { validateProductData } from "../middleware/validateProductData.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find().lean();

    console.log("📦 Total productos en BD:", productos.length);

    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ getProductos error:", error);
    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

/* ========= GET BY ID ========= */
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========= CREATE ========= */
export const crearProducto = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: "Formato inválido" });
    }

    const validationErrors = validateProductData(data);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    if (!data.sku || !data.sku.trim()) {
      data.sku = await generateUniqueSku(data.nombre);
    }

    if (!data.slug) {
      data.slug = await generateUniqueSlug(data.nombre);
    }

    data.features = (data.features || []).filter(Boolean);
    data.specs = (data.specs || []).filter((s) => s.key && s.value);
    data.tags = (data.tags || []).map((t) => t.trim());

    const producto = await Producto.create(data);

    res.json(producto);
  } catch (error) {
    console.error("❌ crearProducto:", error);
    res.status(500).json({ error: "Error creando producto" });
  }
};

/* ========= EDIT ========= */
export const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ error: "Formato inválido" });
    }

    // 🔥 imágenes existentes desde frontend
    const imagenesExistentes = data.imagenes || [];

    // 🔥 imágenes nuevas (multer)
    const nuevasImagenes =
      req.files?.map((file) => {
        // 👇 aquí debes subir a cloudinary
        // por ahora simulemos:
        return file.originalname;
      }) || [];

    // 🔥 MERGE REAL
    data.imagenes = [...imagenesExistentes, ...nuevasImagenes];

    console.log("DATA:", data);
    console.log("FILES:", req.files);

    // limpieza
    data.features = (data.features || []).filter(Boolean);
    data.specs = (data.specs || []).filter((s) => s.key && s.value);

    if (!data.sku || !data.sku.trim()) {
      data.sku = await generateUniqueSku(data.nombre);
    }

    if (data.nombre) {
      data.slug = await generateUniqueSlug(data.nombre);
    }

    const producto = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(producto);
  } catch (error) {
    console.error("❌ editarProducto:", error);
    res.status(500).json({ error: "Error editando producto" });
  }
};

export const obtenerProductoPorSlug = async (req, res) => {
  const producto = await Producto.findOne({ slug: req.params.slug });

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(producto);
};

/* ========= DELETE ========= */
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await Producto.findByIdAndDelete(id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========= DUPLICATE ========= */
export const duplicarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const original = await Producto.findById(id);

    if (!original)
      return res.status(404).json({ message: "Producto no encontrado" });

    const copia = original.toObject();

    delete copia._id;
    copia.nombre += " copia";
    copia.sku = undefined;

    const nuevo = await Producto.create(copia);

    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
