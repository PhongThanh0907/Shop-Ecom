import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

const HomePage = React.lazy(() => import("../pages/Home"));
const ProductsPage = React.lazy(() => import("../pages/Products"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"))
const UserPage = React.lazy(() => import("../pages/user"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />
      },
      {
        path: "/user",
        element: <UserPage />
      }
    ],
  },
]);

export default router;
