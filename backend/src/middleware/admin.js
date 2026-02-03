import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔐 AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("🔓 TOKEN DECODED:", decoded);

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const admin = await Admin.findById(decoded.adminId)
      .select("_id name email role activo")
      .lean();

    if (!admin || !admin.activo) {
      return res.status(401).json({ message: "Admin no válido" });
    }

    req.admin = {
      adminId: admin._id.toString(),
      role: admin.role,
      email: admin.email,
    };

    next();
  } catch (error) {
    console.error("❌ AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};
