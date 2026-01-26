import { Router } from "express";
import { addProduct } from "../handlers/Admin.js";

const router = Router();

router.post("/add-product", addProduct);

export default router;
