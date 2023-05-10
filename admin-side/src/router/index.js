import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Location from "../pages/Location";

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
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
