import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />

      <Outlet />
    </div>
  );
}
