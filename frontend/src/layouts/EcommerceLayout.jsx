import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const EcommerceLayout = () => {
  return (
    <>
      <Header />

      <main className="relative flex-1 min-h-screen w-full bg-[#0B0B0F] text-zinc-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full absolute top-[-100px] left-1/3" />
          <div className="w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full absolute bottom-[-100px] right-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 py-10 space-y-6">
          <div className="text-sm text-zinc-500">
            <Breadcrumbs />
          </div>

          <div className="min-h-[60vh]">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EcommerceLayout;
