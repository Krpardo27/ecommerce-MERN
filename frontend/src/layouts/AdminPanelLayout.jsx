import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import FullscreenLoader from "../components/FullscreenLoader";
import { getAdminProfile } from "../api/admin";

const AdminPanelLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const justLoggedIn = useMemo(() => {
    return sessionStorage.getItem("ADMIN_JUST_LOGGED_IN") === "1";
  }, []);

  const [showLoginLoader, setShowLoginLoader] = useState(justLoggedIn);

  const { isFetching } = useQuery({
    queryKey: ["admin-auth"],
    queryFn: getAdminProfile,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!showLoginLoader) return;

    sessionStorage.removeItem("ADMIN_JUST_LOGGED_IN");

    const id = requestAnimationFrame(() => {
      setShowLoginLoader(false);
    });

    return () => cancelAnimationFrame(id);
  }, [showLoginLoader]);

  return (
    <>
      <FullscreenLoader
        isVisible={showLoginLoader || (justLoggedIn && isFetching)}
        label="Cargando panel…"
      />

      <div className="min-h-screen flex bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-zinc-100">
        {/* SIDEBAR */}
        <SidebarAdmin
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* MAIN WRAPPER */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* HEADER */}
          <HeaderAdmin onOpenSidebar={() => setSidebarOpen(true)} />

          {/* SCROLL AREA */}
          <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 bg-black/50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;
