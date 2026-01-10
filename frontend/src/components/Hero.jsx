const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute -top-24 -left-24
            w-96 h-96
            bg-lime-400/20
            rounded-full
            blur-3xl
          "
        />
        <div
          className="
            absolute bottom-0 right-0
            w-96 h-96
            bg-fuchsia-500/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)]
            bg-[size:24px_24px]
          "
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        <div className="space-y-6">
          <span
            className="
              inline-block
              text-xs uppercase tracking-widest
              text-lime-400
            "
          >
            Nueva colección
          </span>

          <h1
            className="
              text-3xl md:text-4xl lg:text-5xl
              font-semibold
              tracking-tight
              text-zinc-100
              leading-tight
            "
          >
            Streetwear
            <br />
            <span className="text-zinc-400">sin reglas</span>
          </h1>

          <p className="text-sm md:text-base text-zinc-400 max-w-md">
            Prendas urbanas diseñadas para destacar en la calle. Drops
            limitados, actitud real.
          </p>

          <div className="flex gap-4">
            <button
              className="
                px-6 py-3
                rounded-2xl
                bg-lime-400 text-zinc-950
                text-sm font-semibold
                tracking-wide
                hover:bg-lime-300
                transition
              "
            >
              Ver productos
            </button>

            <button
              className="
                px-6 py-3
                rounded-2xl
                border border-zinc-700
                text-sm font-medium
                text-zinc-200
                hover:bg-zinc-900
                transition
              "
            >
              Explorar drops
            </button>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="relative">
          <div
            className="
              absolute inset-0
              bg-gradient-to-tr from-black/60 via-transparent to-transparent
              rounded-2xl
              z-10
            "
          />
          <img
            src="/hero/urban_industrial_3.jpg"
            alt="Moda urbana"
            className="
              w-full h-[380px] md:h-[420px]
              object-cover
              rounded-2xl
            "
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
