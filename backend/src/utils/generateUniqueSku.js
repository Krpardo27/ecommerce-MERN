import slugify from "slugify";
import Producto from "../models/Producto.js";

export const generateUniqueSku = async (nombre) => {
  const base =
    slugify(nombre || "producto", {
      lower: true,
      strict: true,
    }) || "producto";

  let sku;
  let exists = true;

  while (exists) {
    const random = Math.floor(10000 + Math.random() * 90000);
    sku = `${base}-${random}`;

    exists = await Producto.exists({ sku });
  }

  return sku;
};
