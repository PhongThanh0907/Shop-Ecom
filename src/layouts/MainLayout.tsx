import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import ToasterProvider from "../providers/ToasterProvider";
import Header from "../components/header";
import Navbar from "../components/navbar";

const MainLayout = () => {
  return (
    <>
      <ToasterProvider />
      <Header />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MainLayout;
