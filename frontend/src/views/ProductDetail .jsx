import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductoBySlug } from "../services/productos.api";
import { useCartContext } from "../hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { getOptimizedImage } from "../utils/image";
import { useEffect } from "react";
import ProductGallery from "../components/Products/ProductGallery";
import PriceBlock from "../components/Products/PriceBlock";
import ProductActions from "../components/Products/ProductActions";
import { useState } from "react";

const ProductDetail = () => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const { categoria, slug } = useParams();

  const [tab, setTab] = useState("descripcion");

  const {
    data: producto,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["producto", slug],
    queryFn: () => fetchProductoBySlug(slug),
  });

  useEffect(() => {
    if (!producto) return;

    const expected = producto.subcategoriaKey || producto.categoriaKey;

    if (categoria !== expected) {
      navigate(`/producto/${expected}/${producto.slug}`, {
        replace: true,
      });
    }
  }, [producto, categoria, navigate]);

  if (isLoading) return <p className="p-10">Cargando...</p>;
  if (error || !producto) return <p>Error</p>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        {/* GALERÍA */}
        <ProductGallery
          images={producto.imagenes}
          nombre={producto.nombre}
        />

        {/* INFO */}
        <div className="space-y-8 lg:sticky lg:top-24">
          {/* HEADER */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              {producto.nombre}
            </h1>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              {producto.shortDescription}
            </p>
          </div>

          {/* PRICE */}
          <div className="border-t border-b border-zinc-800 py-4">
            <PriceBlock precio={producto.precio} />
          </div>

          {/* FEATURES */}
          {/* {producto.features?.length > 0 && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">
                ⚡ Características principales
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-300">
                {producto.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-[2px]">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* SPECS */}
          {/* {producto.specs?.length > 0 && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">
                🧾 Especificaciones técnicas
              </h3>

              <div className="divide-y divide-zinc-800 text-sm">
                {producto.specs.map((s, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <span className="text-zinc-400">{s.key}</span>
                    <span className="text-white font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* STOCK */}
          <div className="text-sm">
            {producto.stock > 0 ? (
              <span className="text-emerald-400 font-medium">
                ✔ En stock ({producto.stock})
              </span>
            ) : (
              <span className="text-red-400 font-medium">✖ Agotado</span>
            )}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <ProductActions producto={producto} addToCart={addToCart} />
          </div>
        </div>
        <section className="pt-10">
          {/* TABS NAV */}
          <div className="flex gap-6 border-b border-zinc-800 mb-6">
            <button
              onClick={() => setTab("descripcion")}
              className={`pb-2 text-sm ${
                tab === "descripcion"
                  ? "text-white border-b-2 border-indigo-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Descripción
            </button>

            <button
              onClick={() => setTab("specs")}
              className={`pb-2 text-sm ${
                tab === "specs"
                  ? "text-white border-b-2 border-indigo-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Especificaciones
            </button>
          </div>
          {/* CONTENT */}
          <div
            className={`pb-2 text-sm font-medium transition ${
              tab === "descripcion"
                ? "text-white border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {tab === "descripcion" && (
              <div className="space-y-6 max-w-3xl">
                <p className="leading-relaxed">{producto.longDescription}</p>

                {producto.features?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      ⚡ Características
                    </h3>

                    <ul className="space-y-1">
                      {producto.features.map((f, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-lime-400">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {tab === "specs" && (
              <div className="max-w-3xl overflow-x-auto">
                <table className="w-full border border-zinc-800 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-zinc-800">
                    {producto.specs?.map((s, i) => (
                      <tr key={i} className="hover:bg-zinc-900/40 transition">
                        <td className="px-4 py-3 text-zinc-400 w-1/2">
                          {s.key}
                        </td>
                        <td className="px-4 py-3 text-white font-medium text-right">
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductDetail;
