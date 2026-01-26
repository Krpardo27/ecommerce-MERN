import { Outlet } from "react-router-dom";
import NavbarUser from "../components/User/NavbarUser";
import HeaderUser from "../components/User/HeaderUser";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 relative overflow-hidden">
      <HeaderUser />
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

export default UserLayout;
