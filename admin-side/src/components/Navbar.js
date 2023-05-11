import DarkModeSwitcher from "./DarkModeSwitch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar(params) {
  const navigate = useNavigate();

  const swallConfirm = (cb) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        cb();
      }
    });
  };

  const logout = () => {
    swallConfirm(() => {
      localStorage.clear();
      navigate("/login");
    });
  };
  return (
    <>
      <div className="navbar bg-base-100 mb-14 mt-2">
        <div className="navbar-start">
          <img className="w-12 h-17" src="https://clipground.com/images/png-tracking-1.png" />
        </div>

        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-2xl font-serif">TrackWise</a>
        </div>

        <div className="navbar-end">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <Link to="/">
                <li>
                  <a>Home</a>
                </li>
              </Link>
              <Link to="/register">
                <li>
                  <a>Add Admin</a>
                </li>
              </Link>
              <li onClick={logout}>
                <a>LogOut</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
