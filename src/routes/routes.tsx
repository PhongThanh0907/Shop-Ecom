import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

const HomePage = React.lazy(() => import("../pages/Home"));
const ProductsPage = React.lazy(() => import("../pages/Products"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const PromotionProduct = React.lazy(() => import("../pages/PromotionProduct"));
const UserPage = React.lazy(() => import("../pages/user"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));
const PaymentPage = React.lazy(() => import("../pages/Payment"));

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
        path: "/promotion",
        element: <PromotionProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      { path: "/resetpassword/:id", element: <ResetPassword /> },
      { path: "/payment", element: <PaymentPage /> },
    ],
  },
]);

export default router;
