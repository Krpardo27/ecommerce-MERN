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

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

/* ================= PUBLIC ================= */

router.get("/", getProductos);
router.get("/slug/:slug", obtenerProductoPorSlug);
router.get("/:id", obtenerProductoPorId);

/* ================= ADMIN ================= */

router.post("/", authenticate, requireAdmin, crearProducto);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  upload.array("imagenes"),
  editarProducto,
);

router.delete("/:id", authenticate, requireAdmin, eliminarProducto);

router.post("/:id/duplicate", authenticate, requireAdmin, duplicarProducto);

export default router;
