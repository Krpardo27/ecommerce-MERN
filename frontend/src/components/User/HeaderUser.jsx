import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/usuarios";

const HeaderUser = ({ user }) => {
  if (!user) return null;

  const name = user.name;
  const email = user.email;

  return (
    <header className="relative w-full bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-lime-400/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-lime-400">
            {name.charAt(0)}
          </span>
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-zinc-100 truncate">
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
