import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import ToasterProvider from "../providers/ToasterProvider";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Brands from "../components/brands";
import Contact from "../components/contact";
import Footer from "../components/footer";
import LoadingButton from "../components/loading/LoadingButton";

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
      <Footer />
    </>
  );
};

export default MainLayout;
