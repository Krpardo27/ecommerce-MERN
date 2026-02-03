import { Router } from "express";
import { addProduct, adminLogin, adminProfile } from "../handlers/Admin.js";
import { authenticateAdmin } from "../middleware/admin.js";
import { body } from "express-validator";
import { handleInputErrores } from "../middleware/validation.js";

const router = Router();

router.get("/profile", authenticateAdmin, adminProfile, (req, res) => {
  res.json({
    message: "Bienvenido admin",
    admin: req.admin,
  });
});
router.get("/dashboard", authenticateAdmin, (req, res) => {});

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

export default router;
