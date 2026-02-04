import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Layout from "./Layout";
import ProductDetailPage from "./pages/ProductDetailPage/page";
import NotFoundPage from "./pages/NotFoundPage/page";
import CartPage from "./pages/CartPage/page";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Layout /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      {
        path: "not-found",
        element: <NotFoundPage>Page Not Found</NotFoundPage>,
      },
      { path: "*", element: <NotFoundPage>Page Not Found</NotFoundPage> },
    ],
  },
];

export const router = createBrowserRouter(routes);
