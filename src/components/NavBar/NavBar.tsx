import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthStore from "../../undux/AuthStore";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import UserBar from "./UserBar";
import ButtonBar from "./ButtonBar";

function NavBar() {
    let authStore = AuthStore.useStore();
    let { t } = useTranslation();
    return (
        <nav className="navbar navbar-dark navbar-expand-md justify-content-center fixed-top">
          <div className="w-100 visible-md text-center">
            <a href="/" className="navbar-brand">
              <span style={{ color: "#B10003" }}> Red</span>NX
            </a>
            <SearchBar hasNavbarToggler={true} />
          </div>
          <div
            className="navbar-collapse collapse w-100"
            id="mainNavbarColappser"
          >
            <div className="d-flex w-100 mr-auto navbar-margin-top-md">
              <Link to="/" className="navbar-brand hidden-md">
                <span style={{ color: "#B10003" }}> Red</span>NX
              </Link>
              <ul className="navbar-nav w-100">
                <NavLink to="/">{t("components.navbar.home")}</NavLink>
                <NavLink to="/discover">
                  {t("components.navbar.discover")}
                </NavLink>
              </ul>
            </div>
            <ul className="navbar-nav w-100 justify-content-center hidden-md">
              <SearchBar hasNavbarToggler={false} />
            </ul>
            {authStore.get("isAuthenticated") ? <UserBar /> : <ButtonBar />}
          </div>
        </nav>
      );
}

export default NavBar;