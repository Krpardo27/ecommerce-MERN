import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usuario.findById(decoded.userId)
      .select("_id name email role activo")
      .lean();

    if (!user || !user.activo) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
