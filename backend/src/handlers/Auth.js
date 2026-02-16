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
  const { email, password } = req.body;

  const emailClean = email.trim().toLowerCase();

  const user = await Usuario.findOne({ email: emailClean });

  if (!user) return res.status(404).json({ error: "El usuario no existe" });

  if (!user.activo) return res.status(403).json({ error: "Usuario inactivo" });

  const ok = await checkPassword(password, user.password);

  if (!ok) return res.status(401).json({ error: "Password incorrecta" });

  const token = generateJWT({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  res.json({ token });
};

export const getUser = async (req, res) => {
  res.json({ user: req.user });
};
