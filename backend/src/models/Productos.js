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
    },

    imagenes: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 4;
        },
        message: "El producto debe tener entre 1 y 4 imágenes",
      },
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "productos",
  },
);

export default mongoose.model("Producto", productosSchema, "productos");
