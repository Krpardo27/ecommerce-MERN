const ProductCardSkeleton = () => {
  return (
    <div
      className="
        bg-zinc-900 border border-zinc-800
        rounded-2xl overflow-hidden
        animate-pulse
      "
    >
      <div className="h-52 bg-zinc-800" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
