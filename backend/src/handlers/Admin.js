import cloudinary from "../config/cloudinary.js";
import Producto from "../models/Producto.js";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import fs from "fs";
import Admin from "../models/Admin.js";
import { checkPassword } from "../utils/auth.js";
import { generateJWT } from "../utils/jwt.js";

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

      const getField = (value) => (Array.isArray(value) ? value[0] : value);

      const nombre = getField(fields.nombre);
      const precio = getField(fields.precio);
      const descripcion = getField(fields.descripcion);
      const categoriaKey = getField(fields.categoriaKey);
      const subcategoriaKey = getField(fields.subcategoriaKey);
      const activo = getField(fields.activo ?? "true");

      if (!nombre || typeof nombre !== "string") {
        return res.status(400).json({
          message: "Nombre del producto es obligatorio",
        });
      }

      const images = Array.isArray(files.imagenes)
        ? files.imagenes
        : [files.imagenes].filter(Boolean);

      if (!images.length) {
        return res.status(400).json({
          message: "No se recibieron imágenes",
        });
      }

      const folder = `productos/${categoriaKey}/${subcategoriaKey}`;
      const imageUrls = [];

      for (const img of images) {
        const result = await cloudinary.uploader.upload(img.filepath, {
          folder,
          public_id: `${slugify(nombre, { lower: true })}-${uuidv4()}`,
          resource_type: "image",
        });

        imageUrls.push(result.secure_url);
        fs.unlinkSync(img.filepath);
      }

      const slug = slugify(nombre, { lower: true, strict: true });

      const producto = await Producto.create({
        nombre,
        slug,
        precio: Number(precio),
        descripcion,
        categoriaKey,
        subcategoriaKey,
        imagenes: imageUrls,
        activo: activo === "true",
      });

      return res.status(201).json({
        message: "Producto creado correctamente",
        producto,
      });
    });
  } catch (error) {
    console.error("❌ addProduct error:", error);
    return res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};

export const adminLogin = async (req, res) => {
  console.log("🔥 ADMIN LOGIN BODY:", req.body);

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || !admin.activo) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  const isValid = await checkPassword(password, admin.password);

  if (!isValid) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  const token = generateJWT({
    adminId: admin._id.toString(),
    role: "admin",
  });

  res.json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
};
