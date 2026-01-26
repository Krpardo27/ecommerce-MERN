import { Router } from "express";
import {
  crearCategoria,
  obtenerCategoriaPorSlug,
  obtenerCategorias,
} from "../handlers/Categorias.js";

const router = Router();

router.get("/", obtenerCategorias);
router.get("/:slug", obtenerCategoriaPorSlug);
router.post("/", crearCategoria);

export default router;
