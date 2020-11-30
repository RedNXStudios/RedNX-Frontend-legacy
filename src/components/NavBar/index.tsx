import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import NewUserBar from "./UserBar";

import styles from "./NavBar.module.scss";
import UnduxStores from "../../undux/UnduxStores";

function NavBar() {
  let { sidebar } = UnduxStores.useStores();
  let location = useLocation();
  let { t } = useTranslation();
  let matchWatch = matchPath(location.pathname, {
    path: "/watch/:guid",
    exact: true,
    strict: false,
  });

  function toggleSideBar() {
    sidebar.set("show")(!sidebar.get("show"));
  }

  return (
    <nav
      className={`navbar navbar-dark navbar-expand-md justify-content-center fixed-top ${styles.navBar}`}
    >
      {matchWatch && (
        <button
          className="btn btn-sm mr-2 hidden-md"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleSideBar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      )}
      <Link to="/" className="navbar-brand visible-md">
        <img
          src="/images/logo-dark.svg"
          alt="Logo"
          height="20"
          loading="lazy"
        />
      </Link>
      <div className="w-100 visible-md text-center">
        <SearchBar hasNavbarToggler={true} />
      </div>
      <div className="navbar-collapse collapse w-100" id="mainNavbarColappser">
        <div className="d-flex w-100 mr-auto navbar-margin-top-md">
          <Link to="/" className="navbar-brand hidden-md">
            <img
              src="/images/logo-dark.svg"
              alt="Logo"
              height="20"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav w-100">
            <NavLink to="/" exact={true}>
              {t("navbar.home")}
            </NavLink>
            <NavLink to="/discover">{t("navbar.discover")}</NavLink>
          </ul>
        </div>
        <ul className="navbar-nav w-100 justify-content-center hidden-md">
          <SearchBar hasNavbarToggler={false} />
        </ul>
        <NewUserBar />
      </div>
    </nav>
  );
}

export default NavBar;
