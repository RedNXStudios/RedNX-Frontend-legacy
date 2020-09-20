import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarStore, { StoreProps } from "../../undux/SideBarStore";
import { withTranslation, WithTranslation } from "react-i18next";

import styles from "./NavBar.module.scss";

interface PropType extends StoreProps, WithTranslation {
  hasNavbarToggler: boolean;
}
interface IState {
  searchContent: string;
}

class SearchBar extends React.Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      searchContent: "",
    };
  }

  toggleSideBar = () => {
    const { store } = this.props;
    store.set("show")(!store.get("show"));
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const history = useHistory();
    history.push("/search/" + this.state.searchContent);
  }

  render() {
    const { t } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`input-group mx-auto form-inline ${styles.searchBar}`}>
          {this.props.hasNavbarToggler && (
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary"
                type="button"
                aria-label="Toggle navigation"
                onClick={this.toggleSideBar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          )}
          <input
            type="text"
            className="form-control"
            placeholder={t("navbar.search")}
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={this.state.searchContent}
            onChange={(e) => this.setState({ searchContent: e.target.value })}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-outline-secondary">
              <FontAwesomeIcon icon="search" aria-hidden="true" />
            </button>
            {this.props.hasNavbarToggler && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#mainNavbarColappser"
                aria-controls="mainNavbarColappser"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default SideBarStore.withStore(withTranslation()(SearchBar));
