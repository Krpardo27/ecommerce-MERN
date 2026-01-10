import { useCartContext } from "../hooks/useCart";

const Carrito = () => {
  const { items, totalItems, totalPrice, removeFromCart } = useCartContext();

  if (items.length === 0) {
    return <div className="p-6 text-zinc-500">Tu carrito está vacío.</div>;
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500">
            Tu pedido
          </h2>

          <ul className="space-y-4">
            {items.map((p) => (
              <li
                key={p._id}
                className="
                flex items-center justify-between
                rounded-2xl
                bg-zinc-900/80
                border border-zinc-800
                px-5 py-4
                transition
                hover:border-lime-400/30
              "
              >
                <div className="space-y-1">
                  <p className="font-medium text-zinc-100 leading-tight">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {p.qty} × ${p.precio.toLocaleString("es-CL")}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(p._id)}
                  className="
                  text-xs uppercase tracking-wider
                  text-red-400
                  hover:text-red-300
                  transition
                "
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <aside
          className="
          space-y-6
          lg:sticky lg:top-24
          self-start
        "
        >
          <div
            className="
            rounded-2xl
            bg-zinc-950
            border border-zinc-800
            p-6
            space-y-4
          "
          >
            <h2 className="text-sm uppercase tracking-widest text-zinc-500">
              Resumen
            </h2>

            <div className="flex justify-between text-sm text-zinc-400">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString("es-CL")}</span>
            </div>

            <div className="flex justify-between text-sm text-zinc-400">
              <span>Despacho</span>
              <span>Gratis</span>
            </div>

            <div className="border-t border-zinc-800 pt-4 flex justify-between">
              <span className="text-sm uppercase tracking-widest text-zinc-400">
                Total
              </span>
              <span className="text-xl font-semibold text-lime-400">
                ${totalPrice.toLocaleString("es-CL")}
              </span>
            </div>
          </div>

          {/* MÉTODO DE PAGO (placeholder) */}
          <button
            className="
            w-full
            rounded-2xl
            bg-lime-400 text-zinc-950
            py-4
            font-semibold
            tracking-wide
            transition
            hover:bg-lime-300
            active:scale-[0.98]
          "
          >
            Ir a pagar
          </button>

          <p className="text-xs text-zinc-500 text-center">
            Pago seguro · Cifrado SSL
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Carrito;
