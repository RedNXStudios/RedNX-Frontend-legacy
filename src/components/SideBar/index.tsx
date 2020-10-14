import React from "react";

import SideBarStore from "../../undux/SideBarStore";
import AuthStore from "../../undux/AuthStore";

import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";

import styles from "./SideBar.module.scss";
import { matchPath, useLocation } from "react-router-dom";

function SideBar() {
  let sideBarStore = SideBarStore.useStore();
  let authStore = AuthStore.useStore();
  let location = useLocation();
  let matchWatch = matchPath(location.pathname, {
    path: "/watch/:guid",
    exact: true,
    strict: false,
  });
  return (
    <div
      className={`${styles.sideBar} ${
        !sideBarStore.get("show") && styles.hide
      } ${matchWatch && styles.watchHide}`}
    >
      <MainNav />
      <hr />
      {/*authStore.get("isAuthenticated") && <FollowingNav />*/}
      {authStore.get("isAuthenticated") && <hr />}
      <CategoryNav />
    </div>
  );
}

export default SideBar;
