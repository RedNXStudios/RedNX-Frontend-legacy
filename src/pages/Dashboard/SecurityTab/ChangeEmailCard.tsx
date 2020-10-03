import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import ProfileStore, { StoreProps } from "../../../undux/ProfileStore";
import Net from "../../../utils/Net";

import styles from "../dasboard.module.scss";

interface IProps extends StoreProps, WithTranslation {}

interface IState {
  email: string;
  password: string;
  errorId: number;
  errorMessage?: string;
}

class ChangeEmailCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: props.store.get("email"),
      password: "",
      errorId: -1,
    };
  }

  updateEmail = async () => {
    Net.post("/api/account/change/email", {
      email: this.state.email,
      password: this.state.password,
    })
      .then((e) => {
        if (e.data && e.data.error) {
          this.setState({
            errorId: e.data.error.code,
            errorMessage: e.data.error.message,
          });
          return;
        }
        if (e.data && e.data.success) {
          //TODO: ALO
        }
      })
      .catch((e) => {
        if (e.response.data && e.response.data.error) {
          this.setState({
            errorId: e.response.data.error.code,
            errorMessage: e.response.data.error.message,
          });
          return;
        }
      });
  };

  render() {
    let { t, i18n } = this.props;
    return (
      <div className={styles.card}>
        <h5> {t("page.dashboard.changeEmail")}</h5>
        <div className="card">
          <div className="card-body">
            <div
              className={`bubble-error ${this.state.errorId > -1 && "show"}`}
            >
              {this.state.errorId > -1 &&
              i18n.exists("error.changeEmail." + this.state.errorId.toString())
                ? t("error.changeEmail." + this.state.errorId.toString())
                : this.state.errorMessage}
            </div>
            <div className="form-group">
              <label> {t("page.dashboard.email")}</label>
              <input
                type="email"
                className="form-control"
                required
                autoComplete="email"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label> {t("page.dashboard.currentPassword")}</label>
              <input
                type="password"
                className="form-control"
                required
                minLength={8}
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </div>
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.updateEmail}
              >
                {t("page.dashboard.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileStore.withStore(withTranslation()(ChangeEmailCard));
