import { Router } from "express";
import { addProduct, adminLogin } from "../handlers/Admin.js";
import { authenticateAdmin } from "../middleware/admin.js";
import { body } from "express-validator";
import { handleInputErrores } from "../middleware/validation.js";

const router = Router();

router.post(
  "/login",
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrores,
  adminLogin,
);

router.post("/add-product", authenticateAdmin, addProduct);

router.get("/dashboard", authenticateAdmin, (req, res) => {
  res.json({
    message: "Bienvenido admin",
    admin: req.admin,
  });
});

export default router;
