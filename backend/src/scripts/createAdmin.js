import mongoose from "mongoose";
import dotenv from "dotenv";
import { hashPassword } from "../utils/auth.js";
import Usuario from "../models/Usuario.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const password = await hashPassword("admin1234");

  await Usuario.create({
    name: "Administrador",
    email: "admin@correo.com",
    password,
    role: "admin",
  });

  console.log("✅ Admin creado");
  process.exit();
};

run();
