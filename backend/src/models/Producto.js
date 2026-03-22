import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    nombre: String,
    slug: { type: String, unique: true },

    precio: Number,
    precioOferta: Number,

    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true, sparse: true },
    marca: { type: String, index: true },

    tags: { type: [String], index: true },
    destacado: { type: Boolean, default: false },

    categoriaKey: String,
    subcategoriaKey: String,

    imagenes: [String],

    shortDescription: String,
    longDescription: String,

    features: [String],

    specs: [
      {
        key: String,
        value: String,
      },
    ],

    descripcion: String,

    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Producto", productosSchema, "productos");
