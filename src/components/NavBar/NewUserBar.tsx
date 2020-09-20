/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import AuthStore from "../../undux/AuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";

function NewUserBar() {
  const { t } = useTranslation();
  let authStore = AuthStore.useStore();

  async function logout() {
    authStore.set("token")(null);
  }

  return (
    <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
      <li className="nav-item mr-3">
        <a
          className="nav-link"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="bell" />
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className={`nav-link`}
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="user" />
        </a>
        <div
          className={`${styles.animate} ${styles.slideIn} ${styles.dropDown} dropdown-menu dropdown-menu-right`}
          aria-labelledby="navbarDropdownMenuLink"
        >
          <Link className="dropdown-item" to="/language">
            <FontAwesomeIcon icon="globe-americas" />
            {t("navbar.language")}
          </Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/login">
            <FontAwesomeIcon icon="sign-in-alt" />
            Login
          </Link>
          <Link className="dropdown-item" to="/register">
            <FontAwesomeIcon icon="sign-in-alt" />
            Register
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default NewUserBar;
