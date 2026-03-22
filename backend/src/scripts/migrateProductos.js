import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Producto from "../models/Producto.js";

await mongoose.connect(process.env.MONGO_URI);

const productos = await Producto.find();

for (const p of productos) {
  // 🔹 Migrar longDescription
  if (!p.longDescription && p.descripcion) {
    p.longDescription = p.descripcion;
  }

  // 🔹 Migrar shortDescription
  if (!p.shortDescription && p.descripcion) {
    p.shortDescription = p.descripcion.slice(0, 120);
  }

  // 🔹 Asegurar arrays
  if (!p.features) p.features = [];
  if (!p.specs) p.specs = [];

  // 🔥 ELIMINAR CAMPO ANTIGUO
  if (p.descripcion) {
    p.descripcion = undefined; // 👈 clave en mongoose
  }

  await p.save();
}

console.log("✅ Migración completa + limpieza hecha");
process.exit();