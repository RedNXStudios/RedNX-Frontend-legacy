import React from "react";

import SidebarStore, { StoreProps } from "../../undux/SidebarStore";

import styles from "./sidebar.module.scss";

class SideBar extends React.Component<StoreProps> {
  render() {
    const { store } = this.props;
    return (
      <div className={`${styles.sidebar} ${!store.get("show") && styles.hide}`}>
        {/*<MainNav />
            {auth.get("isLogged") && <hr />}
            {auth.get("isLogged") && <FollowingNav />}
            <hr />
            <CategoryNav />*/}
      </div>
    );
  }
}

export default SidebarStore.withStore(SideBar);
