/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import i18n from "../i18n";

export default function Navbar(params) {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  // console.log(i18n);

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
          <img className="w-12 h-17" src="https://clipground.com/images/png-tracking-1.png" alt="logo" />
        </div>

        <div className="navbar-center">
          <p className="btn btn-ghost normal-case text-2xl font-serif">TrackWise</p>
        </div>

        <div className="navbar-end">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle uppercase">
              {i18n.language}
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
              <li className="text-sm">
                <a onClick={() => changeLang("en")}>English</a>
              </li>
              <li className="text-sm">
                <a onClick={() => changeLang("id")}>Indonesia</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">
              <Link to="/">
                <li>
                  <a>{t("home")}</a>
                </li>
              </Link>
              <Link to="/register">
                <li>
                  <a>{t("add-admin")}</a>
                </li>
              </Link>
              <li onClick={logout}>
                <a>{t("logout")}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
