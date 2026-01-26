import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingBag, FiMapPin, FiLock } from "react-icons/fi";

const navItemClass = ({ isActive }) =>
  `
    flex items-center gap-3
    px-4 py-3
    rounded-xl
    text-sm font-medium
    transition
    ${
      isActive
        ? "bg-lime-400/10 text-lime-400"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
    }
  `;

const NavbarUser = () => {
  return (
    <nav className="w-full">
      <ul className="space-y-1">
        <li>
          <NavLink to="/auth/profile" className={navItemClass} end>
            <FiUser className="w-5 h-5" />
            <span>Mi perfil</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/auth/profile/compras" className={navItemClass}>
            <FiShoppingBag className="w-5 h-5" />
            <span>Mis compras</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/auth/profile/direcciones" className={navItemClass}>
            <FiMapPin className="w-5 h-5" />
            <span>Direcciones</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/auth/profile/seguridad" className={navItemClass}>
            <FiLock className="w-5 h-5" />
            <span>Seguridad</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
