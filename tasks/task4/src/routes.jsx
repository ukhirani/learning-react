import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import CartLayout from "./CartLayout";

const routes = [
  { path: "/", element: <Layout /> },
  { path: "/cart", element: <CartLayout /> },
];

export const router = createBrowserRouter(routes);
