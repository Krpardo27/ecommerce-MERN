import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/queries/useMe";
import { FiBox } from "react-icons/fi";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const { data, isLoading } = useMe();

  if (!token) return <Navigate to="/admin/login" replace />;

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center text-zinc-300">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <FiBox className="animate-bounce text-emerald-400" />
          Iniciando sesión…
        </div>
      </div>
    );

  if (!data?.user?.role) return <Navigate to="/admin/login" replace />;
  if (data.user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminProtectedRoute;
