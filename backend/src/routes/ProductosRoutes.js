import { Router } from "express";
import multer from "multer";

import {
  crearProducto,
  duplicarProducto,
  editarProducto,
  eliminarProducto,
  getProductos,
  obtenerProductoPorId,
  obtenerProductoPorSlug,
} from "../handlers/Productos.js";

import { requireAdmin } from "../middleware/requireAdmin.js";
import { authenticate } from "../middleware/auth.js";
import { productValidation } from "../validators/producto.validator.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

/* ================= PUBLIC ================= */

router.get("/", getProductos);
router.get("/slug/:slug", obtenerProductoPorSlug);
router.get("/:id", obtenerProductoPorId);

/* ================= ADMIN ================= */
router.post(
  "/",
  authenticate,
  requireAdmin,
  upload.array("imagenes"),
  productValidation,
  crearProducto,
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  upload.array("imagenes"),
  productValidation,
  editarProducto,
);

router.delete("/:id", authenticate, requireAdmin, eliminarProducto);

router.post("/:id/duplicate", authenticate, requireAdmin, duplicarProducto);

export default router;
