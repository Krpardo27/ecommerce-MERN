import { Router } from "express";
import {
  obtenerProductos,
  obtenerProductoPorSlug,
} from "../controllers/ProductosControllers.js";

const router = Router();

router.get("/", obtenerProductos);
router.get("/slug/:slug", obtenerProductoPorSlug);

export default router;
