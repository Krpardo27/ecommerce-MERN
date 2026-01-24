import { Router } from "express";
import { addProduct } from "../controllers/AdminControllers.js";

const router = Router();

router.post("/add-product", addProduct);

export default router;
