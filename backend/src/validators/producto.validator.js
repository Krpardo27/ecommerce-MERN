import { body } from "express-validator";

export const productValidation = [
  body("nombre")
    .notEmpty()
    .withMessage("Nombre requerido")
    .isLength({ min: 3 }),

  body("precio").isNumeric().withMessage("Precio inválido"),

  body("stock").optional().isInt({ min: 0 }),

  body("shortDescription").optional().isString(),
  body("longDescription").optional().isString(),

  body("features").optional().isArray(),
  body("features.*").isString(),

  body("specs").optional().isArray(),
  body("specs.*.key").isString(),
  body("specs.*.value").isString(),
];
