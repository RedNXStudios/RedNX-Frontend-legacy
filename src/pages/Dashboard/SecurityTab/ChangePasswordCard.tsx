import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import Net from "../../../utils/Net";

import styles from "../dasboard.module.scss";

interface IProps extends WithTranslation {}

interface IState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  errorId: number;
  errorMessage?: string;
}

class ChangePasswordCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorId: -1,
    };
  }

  updatePassword = () => {
    Net.post("/api/account/change/email", {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword,
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
    let { t } = this.props;
    return (
      <div className={styles.card}>
        <h5>{t("page.dashboard.changePassword")}</h5>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label>{t("page.dashboard.currentPassword")}</label>
              <input
                type="password"
                className="form-control"
                required
                minLength={8}
                autoComplete="current-password"
              />
            </div>
            <div className="form-group">
              <label>{t("page.dashboard.newPassword")}</label>
              <input
                type="password"
                className="form-control"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label>{t("page.dashboard.confirmNewPassword")}</label>
              <input
                type="password"
                className="form-control"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.updatePassword}
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

export default withTranslation()(ChangePasswordCard);
