import { FiShoppingBag, FiPlus } from "react-icons/fi";
import { useCartContext } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { useState } from "react";

const ProductCard = ({ producto }) => {
  const { nombre, precio, imagenes, categoria } = producto;
  const [added, setAdded] = useState(false);

  const { addToCart } = useCartContext();
  const { showToast } = useToast();

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
    <article className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition hover:border-lime-400/30">
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imagenes?.[0]}
          alt={nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Precio */}
        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-lime-400">
          ${precio.toLocaleString("es-CL")}
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
          <button
            onClick={handleAdd}
            className={`
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
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-zinc-100 line-clamp-2">
          {nombre}
        </h3>

        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {categoria?.nombre}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
