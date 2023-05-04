import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      // {
      //   path: "/product",
      //   element: <Product />,
      // },
      // {
      //   path: "/product/:id",
      //   element: <Modal />,
      // },
      // {
      //   path: "/categories",
      //   element: <Categories />,
      // },
      // {
      //   path: "/newadmin",
      //   element: <Register />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
