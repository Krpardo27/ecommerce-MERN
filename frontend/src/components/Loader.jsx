const Loader = ({ label = "Cargando…" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <span
          className="
            absolute inset-0
            rounded-full
            border-2 border-zinc-700
          "
        />
        <span
          className="
            absolute inset-0
            rounded-full
            border-2 border-lime-400 border-t-transparent
            animate-spin
          "
        />
      </div>
      <p className="text-sm tracking-wide text-zinc-400">{label}</p>
    </div>
  );
};

export default Loader;
