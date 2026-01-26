import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrores } from "../middleware/validation.js";
import { createAccount, getUser, login } from "../handlers/Auth.js";

const router = Router();

router.get("/user", getUser);

router.post(
  "/register",
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Mínimo 3 caracteres"),
  body("email").isEmail().withMessage("El email es obligatorio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrores,
  createAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("El email es obligatorio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrores,
  login,
);

export default router;
