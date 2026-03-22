
const PriceBlock = ({ precio }) => {
  const descuento = 0.2;
  const precioFinal = precio * (1 - descuento);

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-400 line-through">
        ${precio.toLocaleString("es-CL")}
      </p>

      <p className="text-3xl font-bold text-purple-400">
        ${Math.round(precioFinal).toLocaleString("es-CL")}
      </p>

      <span className="text-xs bg-purple-600 px-2 py-1 rounded">
        20% dcto transferencia
      </span>
    </div>
  );
};

export default PriceBlock;
