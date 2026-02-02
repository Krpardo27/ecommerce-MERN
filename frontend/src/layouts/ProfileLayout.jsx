import { Navigate, Outlet } from "react-router-dom";
import HeaderUser from "../components/User/HeaderUser";
import NavbarUser from "../components/User/NavbarUser";
import { getUser } from "../api/usuarios";
import { useQuery } from "@tanstack/react-query";

const ProfileLayout = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;
  if (isError || !user) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <HeaderUser user={user} />
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <aside>
          <NavbarUser />
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
