/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import UnduxStores from "../../undux/UnduxStores";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";

function NewUserBar() {
  const { t } = useTranslation();
  let { auth, profile } = UnduxStores.useStores();

  async function logOut() {
    auth.set("token")(null);
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
        {auth.get("isAuthenticated") ? (
          <a
            className={`nav-link ${styles.profilePicture}`}
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className={styles.pictureContainer}>
              <img
                src={`http://s3.tryhosting.com.br/profile/picture/${profile.get(
                  "picture"
                )}`}
                width="30"
                height="30"
                className="mx-auto d-inline-block align-top"
                alt="Profile"
              />
            </div>
          </a>
        ) : (
          <a
            className="nav-link"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon="user" />
          </a>
        )}
        <div
          className={`${styles.animate} ${styles.slideIn} ${styles.dropDown} dropdown-menu dropdown-menu-right`}
          aria-labelledby="navbarDropdownMenuLink"
        >
          {auth.get("isAuthenticated") && (
            <Link className="dropdown-item" to="/dashboard">
              <FontAwesomeIcon icon="sliders-h" />
              Dashboard
            </Link>
          )}
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/language">
            <FontAwesomeIcon icon="globe-americas" />
            {t("navbar.language")}
          </Link>
          <div className="dropdown-divider"></div>
          {!auth.get("isAuthenticated") && (
            <div>
              <Link className="dropdown-item" to="/login">
                <FontAwesomeIcon icon="sign-in-alt" />
                Login
              </Link>
              <Link className="dropdown-item" to="/register">
                <FontAwesomeIcon icon="sign-in-alt" />
                Register
              </Link>
              <a className="dropdown-item" onClick={logOut}>
                <FontAwesomeIcon icon="sign-out-alt" />
                Log out
              </a>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
}

export default NewUserBar;
