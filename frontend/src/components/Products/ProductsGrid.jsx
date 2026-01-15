import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

const ProductsGrid = ({ loading, productos, limit }) => {
  const skeletons = limit === "all" ? 12 : Number(limit);

  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? Array.from({ length: skeletons }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : productos.map((p) => <ProductCard key={p._id} producto={p} />)}
    </section>
  );
};

export default ProductsGrid;
