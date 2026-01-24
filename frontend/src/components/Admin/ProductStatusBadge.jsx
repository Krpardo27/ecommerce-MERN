const ProductStatusBadge = ({ product }) => {
  if (!product.activo) {
    return (
      <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400">
        Inactivo
      </span>
    );
  }

  if (product.stock === 0) {
    return (
      <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">
        Sin stock
      </span>
    );
  }

  return (
    <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
      Activo
    </span>
  );
};

export default ProductStatusBadge;
