import { Router } from "express";
import {
  obtenerProductoPorSlug,
  getProductos,
} from "../controllers/ProductosControllers.js";

const router = Router();

router.get("/", getProductos);
router.get("/slug/:slug", obtenerProductoPorSlug);

export default router;
