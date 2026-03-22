import slugify from "slugify";
import Producto from "../models/Producto.js";

export async function generateUniqueSlug(nombre) {
  let base = slugify(nombre, { lower: true, strict: true });
  let slug = base;
  let count = 1;

  while (await Producto.findOne({ slug })) {
    slug = `${base}-${count++}`;
  }

  return slug;
}
