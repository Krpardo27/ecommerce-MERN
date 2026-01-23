import { Router } from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import Products from "../models/Products.js";

const router = Router();

router.post(
  "/admin/products",
  authMiddleware,
  isAdmin,
  multer({ storage }).array("imagenes", 5),
  async (req, res) => {
    const imagenes = req.files.map((f) => ({
      url: f.path,
      publicId: f.filename,
    }));

    const producto = await Products.create({
      ...req.body,
      imagenes,
    });

    res.status(201).json(producto);
  },
);

export default router;
