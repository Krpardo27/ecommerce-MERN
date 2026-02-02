import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";

const AdminPanelLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex overflow-x-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <SidebarAdmin
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <HeaderAdmin onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 bg-black/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
