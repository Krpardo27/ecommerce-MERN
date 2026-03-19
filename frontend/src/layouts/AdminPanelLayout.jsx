import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import FullscreenLoader from "../components/FullscreenLoader";
import { useMe } from "../hooks/queries/useMe";

const AdminPanelLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const justLoggedIn = useMemo(
    () => sessionStorage.getItem("ADMIN_JUST_LOGGED_IN") === "1",
    [],
  );

  const [showLoginLoader, setShowLoginLoader] = useState(justLoggedIn);

  const { isFetching } = useMe();

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
        <SidebarAdmin
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col min-w-0">
          <HeaderAdmin onOpenSidebar={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 bg-black/50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;
