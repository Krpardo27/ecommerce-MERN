import cloudinary from "../config/cloudinary.js";
import Producto from "../models/Producto.js";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const form = formidable({
      multiples: true,
      maxFiles: 4,
      maxFileSize: 5 * 1024 * 1024,
      filter: ({ mimetype }) => mimetype?.startsWith("image/"),
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: "Error al procesar imágenes" });
      }

      const getField = (v) => (Array.isArray(v) ? v[0] : v);

      const nombre = getField(fields.nombre);
      const precioRaw = getField(fields.precio);
      const stockRaw = getField(fields.stock);
      const descripcion = getField(fields.descripcion);
      const categoriaKey = getField(fields.categoriaKey);
      const subcategoriaKey = getField(fields.subcategoriaKey);
      const activoRaw = getField(fields.activo ?? "true");

      if (!nombre) {
        return res.status(400).json({ message: "Nombre obligatorio" });
      }

      const precio = Number(precioRaw);
      const stock = Number.isFinite(Number(stockRaw)) ? Number(stockRaw) : 0;
      const activo = activoRaw === "true";

      console.log("STOCK RAW:", stockRaw);
      console.log("STOCK PARSED:", stock);

      const images = Array.isArray(files.imagenes)
        ? files.imagenes
        : [files.imagenes].filter(Boolean);

      if (!images.length) {
        return res.status(400).json({ message: "No se recibieron imágenes" });
      }

      const folder = `productos/${categoriaKey}/${subcategoriaKey}`;
      const slug = slugify(nombre, { lower: true, strict: true });

      const imageUrls = await Promise.all(
        images.map(async (img) => {
          try {
            const result = await cloudinary.uploader.upload(img.filepath, {
              folder,
              public_id: `${slug}-${uuidv4()}`,
              resource_type: "image",
            });
            return result.secure_url;
          } finally {
            fs.unlinkSync(img.filepath);
          }
        }),
      );

      const producto = await Producto.create({
        nombre,
        slug,
        precio,
        stock,
        descripcion,
        categoriaKey,
        subcategoriaKey,
        imagenes: imageUrls,
        activo,
      });

      return res.status(201).json({
        message: "Producto creado correctamente",
        producto,
      });
    });
  } catch (error) {
    console.error("❌ addProduct error:", error);
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};
