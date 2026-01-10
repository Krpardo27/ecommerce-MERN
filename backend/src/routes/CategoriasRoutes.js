import { Router } from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorSlug,
  crearCategoria,
} from "../controllers/CategoriasControllers.js";

const router = Router();

router.get("/", obtenerCategorias);
router.get("/:slug", obtenerCategoriaPorSlug);
router.post("/", crearCategoria);

export default router;
