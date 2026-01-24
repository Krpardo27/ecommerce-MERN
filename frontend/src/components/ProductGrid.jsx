import ProductCard from "./ProductCard";

const ProductsGrid = ({ productos = [], onAddToCart }) => {
  if (!productos.length) {
    return (
      <p className="text-sm text-zinc-500 mt-10">
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <section
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {productos.map((p) => (
        <ProductCard key={p._id} producto={p} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
};

export default ProductsGrid;
