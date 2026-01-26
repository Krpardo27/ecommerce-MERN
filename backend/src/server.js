import "dotenv/config";
import cors from "cors";
import { corsConfig } from "./config/cors.js";
import express from "express";
connectDB();

const app = express();

app.use(cors(corsConfig));

import upload from "./middleware/upload.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/AuthRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import productRoutes from "./routes/ProductosRoutes.js";
import categoriesRoutes from "./routes/CategoriasRoutes.js";

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", upload.array("imagenes", 4), adminRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoriesRoutes);

export default app;
