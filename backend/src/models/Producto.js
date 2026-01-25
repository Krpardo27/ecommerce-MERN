import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    precio: { type: Number, required: true, min: 0 },
    descripcion: { type: String, default: "" },
    categoriaKey: {
      type: String,
      required: true,
      enum: [
        "perifericos",
        "componentes-pc",
        "audio-gamer",
        "sillas-gamer",
        "streaming",
      ],
    },
    imagenes: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 4,
      },
    },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Producto", productosSchema, "productos");
