import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    precio: {
      type: Number,
      required: true, // CLP, sin decimales
      min: 0,
    },
    descripcion: {
      type: String,
      required: true,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
      index: true,
    },
    imagenes: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    activo: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
  },
);

export default mongoose.model("Products", productSchema);
