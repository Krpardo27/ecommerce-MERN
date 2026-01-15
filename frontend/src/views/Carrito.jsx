import { useCartContext } from "../hooks/useCart";

const Carrito = () => {
  const { items, totalPrice, removeFromCart } = useCartContext();

  return (
    <section className="pb-20">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LISTA */}
        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500">
            Tu pedido
          </h2>

          <ul className="space-y-4">
            {items.map((p) => (
              <li
                key={p._id}
                className="flex items-center justify-between rounded-2xl bg-zinc-900/80 border border-zinc-800 px-5 py-4 hover:border-lime-400/30"
              >
                <div>
                  <p className="font-medium">{p.nombre}</p>
                  <p className="text-xs text-zinc-500">
                    {p.qty} × ${p.precio.toLocaleString("es-CL")}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(p._id)}
                  className="text-xs uppercase tracking-wider text-red-400 hover:text-red-300"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RESUMEN */}
        <aside className="lg:sticky lg:top-24 space-y-6 self-start">
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
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

          <button className="w-full rounded-2xl bg-lime-400 text-zinc-950 py-4 font-semibold hover:bg-lime-300">
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
