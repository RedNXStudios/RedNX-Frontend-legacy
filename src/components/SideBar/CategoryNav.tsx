import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "./NavLink";

import styles from "./SideBar.module.scss";

function CategoryNav() {
  const { t } = useTranslation();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <p>{t("category.category", { count: 2 })}</p>
      <li className={styles.navTable}>
        <NavLink to="/category/science">
          <FontAwesomeIcon icon="vial" className={styles.icon} />
          {t("category.science")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/category/comedy">
          <FontAwesomeIcon icon="theater-masks" className={styles.icon} />
          {t("category.comedy")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/category/games">
          <FontAwesomeIcon icon="gamepad" className={styles.icon} />
          {t("category.games")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/category/vlog">
          <FontAwesomeIcon icon="camera" className={styles.icon} />
          {t("category.vlogs")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/category/sports">
          <FontAwesomeIcon icon="futbol" className={styles.icon} />
          {t("category.sports")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/category/education">
          <FontAwesomeIcon icon="graduation-cap" className={styles.icon} />
          {t("category.education")}
        </NavLink>
      </li>
    </nav>
  );
}

export default CategoryNav;
