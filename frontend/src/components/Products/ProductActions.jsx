import React from "react";

const ProductActions = ({ producto, addToCart }) => {
  return (
    <div className="space-y-3 pt-4">
      <button
        onClick={() => addToCart(producto)}
        className="w-full border border-purple-500 text-purple-400 py-3 rounded-xl hover:bg-purple-500/10"
      >
        Agregar al carrito
      </button>

      <button className="w-full bg-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700">
        Comprar ahora
      </button>
    </div>
  );
};

export default ProductActions;
