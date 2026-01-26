// src/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex">
      <SidebarAdmin
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <HeaderAdmin onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
