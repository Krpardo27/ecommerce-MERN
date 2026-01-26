import cloudinary from "../config/cloudinary.js";
import Producto from "../models/Producto.js";
import slugify from "slugify";

export const addProduct = async (req, res) => {
  try {
    const {
      nombre,
      precio,
      descripcion,
      categoriaKey,
      activo = true,
    } = req.body;

    if (!req.files || req.files.length < 1) {
      return res.status(400).json({
        message: "Debes subir al menos una imagen",
      });
    }

    if (req.files.length > 4) {
      return res.status(400).json({
        message: "Máximo 4 imágenes permitidas",
      });
    }

    console.log("files:", req.files?.length);
    console.log("body:", req.body);

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "productos",
        },
      ),
    );

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.secure_url);

    const count = await Producto.countDocuments();

    const slug = slugify(nombre, {
      lower: true,
      strict: true,
      trim: true,
    });

    const producto = await Producto.create({
      nombre,
      slug,
      precio,
      descripcion,
      categoriaKey,
      imagenes: imageUrls,
      activo,
    });

    console.log("✅ Producto guardado:", producto._id);
    console.log("📦 Total productos en BD:", count);

    return res.status(201).json({
      message: "Producto creado correctamente",
      producto,
    });
  } catch (error) {
    console.error("❌ addProduct error:", error);
    return res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};


