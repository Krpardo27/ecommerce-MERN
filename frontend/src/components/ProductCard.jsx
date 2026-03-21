import { FiShoppingBag, FiPlus } from "react-icons/fi";
import { useCartContext } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProductoBySlug } from "../services/productos.api";
import { getOptimizedImage } from "../utils/image";
import { productUrls } from "../utils/productUrls";
import { getProductMeta } from "../utils/productMeta";

const ProductCard = ({ producto }) => {
  const { nombre, precio, imagenes, slug } = producto;
  const { categoriaLabel } = getProductMeta(producto);

  const [added, setAdded] = useState(false);

  const { addToCart } = useCartContext();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const prefetchProducto = () => {
    if (queryClient.getQueryData(["producto", slug])) return;

    queryClient.prefetchQuery({
      queryKey: ["producto", slug],
      queryFn: () => fetchProductoBySlug(slug),
      staleTime: 1000 * 60 * 5,
    });
  };

  const handleAdd = () => {
    const existed = addToCart(producto);

    showToast({
      title: existed ? "Cantidad actualizada" : "Añadido al carrito",
      description: nombre,
      action: "go-to-cart",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 300);
  };

  return (
    <article
      onMouseEnter={prefetchProducto}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition hover:border-lime-400/30"
    >
      <Link
        to={productUrls(producto)}
        className="block relative h-52 overflow-hidden"
      >
        <div className="absolute top-3 left-3 bg-zinc-950/80 text-[10px] uppercase px-2 py-1 rounded text-zinc-300">
          {categoriaLabel}
        </div>

        <img
          src={getOptimizedImage(imagenes?.[0], 600)}
          srcSet={`
            ${getOptimizedImage(imagenes?.[0], 320)} 320w,
            ${getOptimizedImage(imagenes?.[0], 600)} 600w,
            ${getOptimizedImage(imagenes?.[0], 900)} 900w
          `}
          sizes="(max-width:640px) 100vw,
                 (max-width:1024px) 50vw,
                 25vw"
          alt={nombre}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-lime-400">
          ${precio.toLocaleString("es-CL")}
        </div>
      </Link>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
        <button
          onClick={handleAdd}
          className={`
            pointer-events-auto
            flex items-center gap-2
            px-4 py-2 rounded-full
            bg-lime-400 text-zinc-950
            text-xs font-semibold uppercase
            transition
            ${added ? "scale-105 ring-2 ring-lime-300" : ""}
          `}
        >
          <FiPlus className="text-sm" />
          Añadir
          <FiShoppingBag className="text-sm" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <Link
          to={productUrls(producto)}
          className="block text-sm font-medium text-zinc-100 line-clamp-2 hover:underline"
        >
          {nombre}
        </Link>

        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {categoriaLabel}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;