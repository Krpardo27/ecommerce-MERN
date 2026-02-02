import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import { hashPassword } from "../utils/auth.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@correo.com";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("⚠️ Admin ya existe");
      process.exit(0);
    }

    const admin = await Admin.create({
      name: "Administrador",
      email,
      password: await hashPassword("admin1234"),
      activo: true,
    });

    console.log("✅ Admin creado:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creando admin:", err);
    process.exit(1);
  }
};

run();
