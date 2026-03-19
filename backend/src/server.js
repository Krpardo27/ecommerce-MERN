import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { corsConfig } from "./config/cors.js";
import express from "express";
connectDB();

const app = express();

app.use(cors(corsConfig));

import authRoutes from "./routes/AuthRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import productRoutes from "./routes/ProductosRoutes.js";
import categoriesRoutes from "./routes/CategoriasRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("ORIGIN:", req.headers.origin);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoriesRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 ERROR REAL:", err);
  res.status(err.status || 500).json({
    message: err.message || "Error interno",
  });
});



export default app;
