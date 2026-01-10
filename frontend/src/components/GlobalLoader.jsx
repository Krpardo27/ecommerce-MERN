const GlobalLoader = () => {
  return (
    <div
      className="
        fixed inset-0 z-[999]
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <span className="absolute inset-0 rounded-full border-2 border-zinc-700" />
          <span className="absolute inset-0 rounded-full border-2 border-lime-400 border-t-transparent animate-spin" />
        </div>

        <p className="text-sm tracking-wide text-zinc-300">Cargando…</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
