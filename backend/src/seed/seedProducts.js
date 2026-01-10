import "dotenv/config";
import mongoose from "mongoose";
import Products from "../models/Products.js";
import Categoria from "../models/Categoria.js";
import { products, categories } from "../data/products.js";

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const cat of categories) {
      const existe = await Categoria.findOne({ slug: cat.slug });
      if (!existe) {
        await Categoria.create({
          nombre: cat.nombre,
          slug: cat.slug,
          imagen: cat.imagen,
          activo: true,
        });
      }
    }

    // 2️⃣ Obtener mapa slug → ObjectId
    const categoriasDB = await Categoria.find();
    const categoriaMap = {};
    categoriasDB.forEach((c) => {
      categoriaMap[c.slug] = c._id;
    });

    // 3️⃣ Insertar SOLO productos nuevos (por slug)
    for (const p of products) {
      const existe = await Products.findOne({ slug: p.slug });
      if (existe) continue;

      await Products.create({
        nombre: p.nombre,
        slug: p.slug,
        precio: p.precio,
        descripcion: p.descripcion,
        categoria: categoriaMap[p.categoriaKey],
        imagenes: p.imagenes,
        activo: p.activo,
      });
    }

    console.log("✅ Productos nuevos agregados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  }
};

runSeed();
