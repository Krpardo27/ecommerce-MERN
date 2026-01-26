import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useCartContext } from "../hooks/useCart";
import NavItem from "./NavItem";

const SCROLL_THRESHOLD = 40;

const Header = () => {
  const { totalItems } = useCartContext();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;

    // swipe right → close
    if (deltaX > 80) {
      setOpen(false);
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          sticky top-0 z-40
          bg-white border-b
          transition-all duration-300
          ${scrolled ? "h-14 shadow-md" : "h-16"}
        `}
      >
        <div
          className={`
            max-w-7xl mx-auto px-4
            flex items-center justify-between
            transition-all duration-300
            ${scrolled ? "h-14" : "h-16"}
          `}
        >
          {/* LOGO */}
          <NavLink
            to="/"
            className={`
              font-bold tracking-tight transition-all
              ${scrolled ? "text-lg" : "text-xl"}
            `}
            onClick={() => setOpen(false)}
          >
            Shop<span className="text-indigo-600">X</span>
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/" label="Home" />
            <NavItem to="/nosotros" label="Nosotros" />
            <NavItem to="/productos" label="Productos" />
            <NavItem to="/categorias" label="Categorías" />
            <NavItem to="/blog" label="Blog" />
            <NavItem to="/contacto" label="Contacto" />
          </nav>
 
          <div>
            <NavItem to="/carrito" label="Carrito 🛒" badge={totalItems} />
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden relative p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Abrir menú"
          >
            <FiMenu className="text-xl" />

            {totalItems > 0 && (
              <span
                className="
                  absolute -top-1 -right-1
                  min-w-[18px] h-[18px]
                  rounded-full
                  bg-indigo-600 text-white
                  text-[10px] font-semibold
                  flex items-center justify-center
                "
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <aside
            ref={drawerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="
              absolute right-0 top-0 h-full w-72
              bg-white
              p-6
              shadow-2xl
              flex flex-col
              touch-pan-y
            "
          >
            {/* HEADER DRAWER */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menú</span>
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <FiX className="text-xl" />
              </button>
            </div>

            {/* NAV DRAWER */}
            <nav className="space-y-2">
              <NavItem
                to="/"
                label="Productos"
                onClick={() => setOpen(false)}
              />
              <NavItem
                to="/categorias"
                label="Categorías"
                onClick={() => setOpen(false)}
              />
            </nav>

            {/* FOOTER DRAWER */}
            <div className="mt-auto pt-6 text-xs text-gray-500">
              Desliza hacia la derecha para cerrar
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
