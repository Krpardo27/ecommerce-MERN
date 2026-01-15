import "dotenv/config";
import mongoose from "mongoose";
import Products from "../models/Products.js";
import Categoria from "../models/Categoria.js";
import { products, categories } from "../data/products.js";

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Limpiando categorías y productos antiguos...");
    await Products.deleteMany({});
    await Categoria.deleteMany({});

    console.log("📦 Insertando categorías gamer...");
    const categoriasInsertadas = await Categoria.insertMany(
      categories.map((c) => ({
        nombre: c.nombre,
        slug: c.slug,
        imagen: c.imagen,
        activo: true,
      }))
    );

    const categoriaMap = {};
    categoriasInsertadas.forEach((c) => {
      categoriaMap[c.slug] = c._id;
    });

    console.log("🎮 Insertando productos gamer...");
    await Products.insertMany(
      products.map((p) => ({
        nombre: p.nombre,
        slug: p.slug,
        precio: p.precio,
        descripcion: p.descripcion,
        categoria: categoriaMap[p.categoriaKey],
        imagenes: p.imagenes,
        activo: p.activo,
      }))
    );

    console.log("✅ Seed gamer completado correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  }
};

runSeed();
