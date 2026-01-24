import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/AdminRoutes.js";
import productRoutes from "./routes/ProductosRoutes.js";
import categoriesRoutes from "./routes/CategoriasRoutes.js";
import upload from "./middleware/upload.js";

connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-mern-8vyn.onrender.com",
  "https://ecommerce-mern-theta-six.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("🌐 Origin recibido:", origin);

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    console.error("❌ No permitido por CORS:", origin);
    return callback(new Error("No permitido por CORS"));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/admin", upload.array("imagenes", 4), adminRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoriesRoutes);

export default app;
