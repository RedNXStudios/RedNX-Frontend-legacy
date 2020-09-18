import React from "react";

import SideBarStore from "../../undux/SideBarStore";
import AuthStore from "../../undux/AuthStore";

import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";

import styles from "./SideBar.module.scss";

function SideBar() {
  let sideBarStore = SideBarStore.useStore();
  let authStore = AuthStore.useStore();
  return (
    <div
      className={`${styles.sideBar} ${
        !sideBarStore.get("show") && styles.hide
      }`}
    >
      <MainNav />
      {authStore.get("isAuthenticated") && <hr />}
      {/*authStore.get("isAuthenticated") && <FollowingNav />*/}
      <CategoryNav />
    </div>
  );
}

export default SideBar;
