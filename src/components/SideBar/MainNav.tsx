import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthStore from "../../undux/AuthStore";
import NavLink from "./NavLink";

import styles from "./SideBar.module.scss";

function MainNav() {
  const { t } = useTranslation();
  let authStore = AuthStore.useStore();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <li className={styles.navTable}>
        <NavLink to="/hot">
          <FontAwesomeIcon icon="fire" /> {t("sidebar.hot")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/recommended">
          <FontAwesomeIcon icon="thumbs-up" /> {t("sidebar.recommended")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/live">
          <FontAwesomeIcon icon="satellite-dish" />{" "}
          {t("sidebar.live")}
        </NavLink>
      </li>
      {authStore.get("isAuthenticated") && (
        <li className={`${styles.navTable}`}>
          <NavLink to="/following">
            <FontAwesomeIcon icon="heart" className={styles.icon} />{" "}
            {t("sidebar.following")}
          </NavLink>
        </li>
      )}
      {authStore.get("isAuthenticated") && (
        <li className={`${styles.navTable}`}>
          <NavLink to="/history">
            <FontAwesomeIcon icon="history" className={styles.icon} />{" "}
            {t("sidebar.history")}
          </NavLink>
        </li>
      )}
    </nav>
  );
}

export default MainNav;
