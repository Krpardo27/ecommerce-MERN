import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminAuthLayout;
