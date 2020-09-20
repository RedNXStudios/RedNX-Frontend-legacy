import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthStore from "../../undux/AuthStore";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import NewUserBar from "./NewUserBar";

import styles from "./NavBar.module.scss";

function NavBar() {
  let authStore = AuthStore.useStore();
  let { t } = useTranslation();
  return (
    <nav
      className={`navbar navbar-dark navbar-expand-md justify-content-center fixed-top ${styles.navBar}`}
    >
      <Link to="/" className="navbar-brand visible-md">
        <img src="images/logo-dark.svg" alt="Logo" height="20" loading="lazy" />
      </Link>
      <div className="w-100 visible-md text-center">
        <SearchBar hasNavbarToggler={true} />
      </div>
      <div className="navbar-collapse collapse w-100" id="mainNavbarColappser">
        <div className="d-flex w-100 mr-auto navbar-margin-top-md">
          <Link to="/" className="navbar-brand hidden-md">
            <img
              src="images/logo-dark.svg"
              alt="Logo"
              height="20"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav w-100">
            <NavLink to="/" exact>
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
