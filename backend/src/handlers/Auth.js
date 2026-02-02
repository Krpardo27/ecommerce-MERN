import { validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { checkPassword, hashPassword } from "../utils/auth.js";
import { generateJWT } from "../utils/jwt.js";

export const createAccount = async (req, res) => {
  // Manejo de errores
  const { email, password } = req.body;

  const userExists = await Usuario.findOne({ email });

  if (userExists) {
    const error = new Error("El usuario ya está registrado");
    return res.status(409).json({ error: error.message });
  }

  const user = new Usuario(req.body);
  user.password = await hashPassword(password);
  console.log(user.password);

  await user.save();

  res.status(201).json({ message: "Usuario registrado correctamente" });
};

export const login = async (req, res) => {
  // Manejo de errores
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Verifica si el usuario existe o si está registrado
  const user = await Usuario.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ error: error.message });
  }

  // Verificar la contraseña
  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("La contraseña es incorrecta");
    return res.status(401).json({ error: error.message });
  }

  const token = generateJWT({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  res.send(token);
};

export const getUser = async (req, res) => {
  res.json(req.user);
};
