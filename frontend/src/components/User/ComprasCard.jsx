import React from "react";

const estadoColor = {
  pagado: "text-green-600 bg-green-50",
  pendiente: "text-yellow-600 bg-yellow-50",
  cancelado: "text-red-600 bg-red-50",
};

const CompraCard = ({ compra }) => {
  return (
    <article className="border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-zinc-500">
            {new Date(compra.fecha).toLocaleDateString()}
          </p>
          <p className="font-semibold">Pedido #{compra._id.slice(-6)}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            estadoColor[compra.estado]
          }`}
        >
          {compra.estado}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-600">{compra.items.length} productos</p>

        <p className="text-lg font-bold">
          ${compra.total.toLocaleString("es-CL")}
        </p>
      </div>

      <button className="self-end text-sm font-medium text-indigo-600 hover:underline">
        Ver detalle
      </button>
    </article>
  );
};

export default CompraCard;
