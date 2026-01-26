import { FiUser, FiMail, FiLock, FiShoppingBag } from "react-icons/fi";

const Perfil = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <header className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-lime-400/20 flex items-center justify-center">
          <FiUser className="text-lime-400 w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Mi perfil</h1>
          <p className="text-sm text-zinc-400">
            Administra tu información personal y seguridad
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
            <FiUser /> Información personal
          </h2>

          <div className="text-sm text-zinc-300 space-y-1">
            <p>
              <span className="text-zinc-400">Nombre:</span> Juan Pérez
            </p>
            <p>
              <span className="text-zinc-400">Email:</span> juan@email.com
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
            <FiLock /> Seguridad
          </h2>

          <button className="text-sm text-lime-400 hover:underline">
            Cambiar contraseña
          </button>
        </div>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 flex items-center gap-2 mb-4">
          <FiShoppingBag /> Últimos pedidos
        </h2>

        <p className="text-sm text-zinc-400">
          Aún no tienes pedidos realizados.
        </p>
      </section>
    </div>
  );
};

export default Perfil;
