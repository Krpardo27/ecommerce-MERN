import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const EcommerceLayout = () => {

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen w-full bg-zinc-800 px-4 py-10">
        <div className="max-w-7xl mx-auto w-full">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
      <Footer />

    </>
  );
};

export default EcommerceLayout;
