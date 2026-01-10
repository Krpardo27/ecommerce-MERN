import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/ProductosRoutes.js";
import categoriesRoutes from "./routes/CategoriasRoutes.js";

connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-mern-8vyn.onrender.com",
  "https://ecommerce-mern-theta-six.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌐 Origin recibido:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ No permitido por CORS:", origin);
        callback(new Error("No permitido por CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);

export default app;
