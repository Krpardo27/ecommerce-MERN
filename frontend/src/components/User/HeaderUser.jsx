const HeaderUser = ({ name = "Juan Pérez", email = "juan@email.com" }) => {
  return (
    <header
      className="
        relative
        w-full
        bg-zinc-950
        border-b border-zinc-800
        overflow-hidden
      "
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center gap-6">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
              <span className="text-2xl font-bold text-lime-400">
                {name.charAt(0)}
              </span>
            </div>
          </div>

          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-lime-400 ring-2 ring-zinc-900" />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-zinc-100 leading-tight">
            {name}
          </h1>

          <p className="text-sm text-zinc-400 truncate">{email}</p>

          <p className="text-xs text-zinc-500 mt-1">Cuenta activa</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
