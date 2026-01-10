import { NavLink } from "react-router-dom";

const linkBase =
  "block px-4 py-3 rounded-xl text-sm font-medium transition";

const active = "bg-black text-white";
const inactive = "text-gray-700 hover:bg-gray-100";

const NavItem = ({ to, label, badge, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? active : inactive}`
      }
    >
      <span className="flex items-center gap-2">
        {label}

        {badge > 0 && (
          <span
            className="
              inline-flex items-center justify-center
              min-w-[18px] h-[18px]
              rounded-full
              bg-indigo-600 text-white
              text-[10px] font-semibold
            "
          >
            {badge}
          </span>
        )}
      </span>
    </NavLink>
  );
};

export default NavItem;
