import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const admin = await Admin.findById(decoded.adminId).lean();

    if (!admin) {
      return res.status(401).json({ message: "Admin no válido" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
