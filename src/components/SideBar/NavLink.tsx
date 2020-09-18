import React, { ReactNode } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import styles from "./SideBar.module.scss";

type PropType = {
  to: string;
  exact?: boolean;
  children?: ReactNode;
};

function NavLink(props: PropType) {
  let match = useRouteMatch({
    path: props.to,
    exact: props.exact,
  });
  return (
    <Link {...props} className={match ? `nav-link ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>
      {props.children}
      <div className="nav-item-active" />
    </Link>
  );
}

export default NavLink;
