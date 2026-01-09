import { useProductos } from "../hooks/useProductos";

const Home = () => {
  const { productos, loading, error } = useProductos();

  if (loading)
    return (
      <p className="text-zinc-400 tracking-wide">
        Cargando productos…
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 font-medium">
        Error: {error}
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((p) => (
          <article
            key={p.id}
            className="
              group relative
              rounded-2xl
              bg-zinc-900
              border border-zinc-800
              overflow-hidden
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]
            "
          >
            {/* IMAGEN */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.images[0]}
                alt={p.title}
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  group-hover:scale-110
                "
              />

              {/* BADGE CATEGORÍA */}
              <span
                className="
                  absolute top-3 left-3
                  rounded-full
                  bg-black/70 backdrop-blur
                  px-3 py-1
                  text-[10px] font-semibold uppercase tracking-wider
                  text-lime-400
                "
              >
                {p.category.name}
              </span>
            </div>

            {/* INFO */}
            <div className="p-5 space-y-2">
              <h3
                className="
                  text-sm font-semibold
                  text-zinc-100
                  leading-snug
                  line-clamp-2
                "
              >
                {p.title}
              </h3>

              <div className="flex items-center justify-between pt-2">
                <span
                  className="
                    text-lg font-bold
                    text-violet-400
                  "
                >
                  ${p.price}
                </span>

                <span
                  className="
                    text-xs
                    text-zinc-500
                    tracking-wide
                  "
                >
                  street drop
                </span>
              </div>
            </div>

            {/* OVERLAY HOVER */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                opacity-0
                group-hover:opacity-100
                transition
                bg-gradient-to-t
                from-black/40
                to-transparent
              "
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
