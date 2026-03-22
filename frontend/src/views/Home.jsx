import { useProductos } from "../hooks/queries/useProductos";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";

const Home = () => {
  const { productos, loading, error } = useProductos();

  if (error) {
    return <p className="text-red-500 px-4">Error: {error}</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <Hero />
      <header className="mb-10 space-y-2 my-10">
        <span
          className="
      inline-block
      text-xs uppercase tracking-widest
      text-lime-400
    "
        >
          Street essentials
        </span>
        <h1
          className="
      text-2xl md:text-3xl lg:text-4xl
      font-semibold
      tracking-tight
      text-zinc-100
      leading-tight
    "
        >
          Diseñado para la calle
          <br />
        </h1>

        <p className="text-sm md:text-base text-zinc-500 max-w-xl">
          Prendas urbanas seleccionadas para moverte con estilo, sin reglas y
          sin poses.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <ProductGrid productos={productos} />
      </div>
    </section>
  );
};

export default Home;
