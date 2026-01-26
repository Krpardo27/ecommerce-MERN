import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductoBySlug } from "../services/productos.api";
import { useCartContext } from "../hooks/useCart";
import Breadcrumbs from "../components/Breadcrumbs";
import { getOptimizedImage } from "../utils/image";

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCartContext();

  const {
    data: producto,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["producto", slug],
    queryFn: () => fetchProductoBySlug(slug),
  });

  if (isLoading) {
    return <div className="p-10 text-zinc-400">Cargando producto…</div>;
  }

  if (error || !producto) {
    return <div className="p-10 text-red-500">Producto no encontrado</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* GALERÍA */}
        <div className="space-y-4">
          <img
            src={getOptimizedImage(producto.imagenes?.[0], 1000)}
            alt={producto.nombre}
            className="w-full rounded-2xl border border-zinc-800 object-cover"
          />
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">{producto.nombre}</h1>
          <p className="text-zinc-400">{producto.descripcion}</p>
          <p className="text-2xl font-bold text-lime-400">
            ${producto.precio.toLocaleString("es-CL")}
          </p>

          <button
            onClick={() => addToCart(producto)}
            className="bg-lime-400 px-8 py-4 rounded-2xl font-semibold"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
