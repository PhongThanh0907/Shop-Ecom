import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import ToasterProvider from "../providers/ToasterProvider";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Brands from "../components/brands";
import Contact from "../components/contact";
import Footer from "../components/footer";
import LoadingButton from "../components/loading/LoadingButton";
import StickyRight from "../components/stickyright/StickyRight";

const MainLayout = () => {
  return (
    <>
      <ToasterProvider />
      <Header />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <LoadingButton />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Brands />
      <Contact />
      <section className="hidden lg:inline fixed bottom-20 right-4">
        <StickyRight />
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;
