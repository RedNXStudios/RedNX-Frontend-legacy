import React from "react";

import UnduxStores from "../../undux/UnduxStores";

import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";

import styles from "./SideBar.module.scss";
import { matchPath, useLocation } from "react-router-dom";

function SideBar() {
  let { sidebar, auth } = UnduxStores.useStores();
  let location = useLocation();
  let matchWatch = matchPath(location.pathname, {
    path: "/watch/:guid",
    exact: true,
    strict: false,
  });
  return (
    <div
      className={`${styles.sideBar} ${
        !sidebar.get("show") && styles.hide
      } ${matchWatch && styles.watchHide}`}
    >
      <MainNav />
      <hr />
      {/*authStore.get("isAuthenticated") && <FollowingNav />*/}
      {auth.get("isAuthenticated") && <hr />}
      <CategoryNav />
    </div>
  );
}

export default SideBar;
