import { Router } from "express";
import { getProductos, obtenerProductoPorSlug } from "../handlers/Productos.js";

const router = Router();

router.get("/", getProductos);
router.get("/slug/:slug", obtenerProductoPorSlug);

export default router;
