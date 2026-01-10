import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative  border-t border-zinc-800 bg-zinc-950">
      {/* FONDO ABSTRACTO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
              Shop<span className="text-lime-400">X</span>
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Streetwear inspirado en la calle.
              <br />
              Drops reales, sin reglas.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-400 mb-4">
              Explorar
            </h4>
            <ul className="space-y-2 text-sm">
              {["Productos", "Categorías", "Nuevos drops", "Ofertas"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-zinc-300 hover:text-lime-400 transition inline-flex items-center gap-1"
                    >
                      {item}
                      <FiArrowUpRight className="text-xs opacity-60" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SOPORTE */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-400 mb-4">
              Soporte
            </h4>
            <ul className="space-y-2 text-sm">
              {["Contacto", "Envíos", "Cambios y devoluciones", "Términos"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-zinc-300 hover:text-lime-400 transition"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-400 mb-4">
              Conecta
            </h4>

            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full border border-zinc-800 text-zinc-300 hover:text-lime-400 hover:border-lime-400/40 transition"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full border border-zinc-800 text-zinc-300 hover:text-lime-400 hover:border-lime-400/40 transition"
              >
                <FiTwitter />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full border border-zinc-800 text-zinc-300 hover:text-lime-400 hover:border-lime-400/40 transition"
              >
                <FiFacebook />
              </a>

              <a
                href="mailto:contacto@shopx.com"
                aria-label="Email"
                className="p-2 rounded-full border border-zinc-800 text-zinc-300 hover:text-lime-400 hover:border-lime-400/40 transition"
              >
                <FiMail />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-zinc-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>
            © {new Date().getFullYear()} ShopX. Todos los derechos reservados.
          </span>

          <span className="uppercase tracking-widest">
            Built for the street
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
