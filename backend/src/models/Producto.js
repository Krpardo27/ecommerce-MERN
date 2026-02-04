import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
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
      required: true,
      min: 0,
    },

    descripcion: {
      type: String,
      default: "",
    },

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
      index: true,
    },

    subcategoriaKey: {
      type: String,
      required: true,
      index: true,
    },

    imagenes: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length >= 1 && arr.length <= 4,
        message: "Debe contener entre 1 y 4 imágenes",
      },
    },
    
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    activo: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Producto", productosSchema, "productos");
