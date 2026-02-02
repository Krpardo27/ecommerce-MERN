import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER BACKEND:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "undefined") {
      return res.status(401).json({ message: "Token inválido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usuario.findById(decoded.userId).lean();

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
