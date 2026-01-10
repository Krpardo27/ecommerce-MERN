import { useProductos } from "../hooks/useProductos";

const Home = () => {
  const { productos, loading, error } = useProductos();

  if (loading) {
    return (
      <p className="text-zinc-400 tracking-wide px-4">Cargando productos…</p>
    );
  }

  if (error) {
    return <p className="text-red-500 font-medium px-4">Error: {error}</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
          Todos los productos
        </h1>
        <p className="text-sm text-zinc-500">
          Descubre nuestra colección completa
        </p>
      </header>

      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
        "
      >
        {productos.map((producto) => (
          <article
            key={producto.id}
            className="
              group
              bg-zinc-900
              border border-zinc-800
              rounded-2xl
              overflow-hidden
              transition
              hover:border-zinc-700
            "
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={producto.imagenes?.[0]}
                alt={producto.nombre}
                loading="lazy"
                className="
                  h-full w-full object-cover
                  transition duration-500
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute top-3 right-3
                  bg-zinc-950/80 backdrop-blur
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                  text-lime-400
                "
              >
                ${producto.precio.toLocaleString("es-CL")}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-zinc-100 line-clamp-2">
                {producto.nombre}
              </h3>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                {producto.categoria?.nombre || producto.categoria?.name}
              </p>
            </div>
          </article>
        ))}
      </div>

      {productos.length === 0 && (
        <p className="text-sm text-zinc-500 mt-10">
          No hay productos disponibles.
        </p>
      )}
    </section>
  );
};

export default Home;
