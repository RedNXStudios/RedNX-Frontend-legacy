import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./Auth.module.scss";

type IProps = {};

type IState = {
  username?: string;
  password?: string;
  showPassword: boolean;
};

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.wrapper} ${styles.loginWrapper}`}>
          <form>
            <div className={styles.logo}>
              <img src="images/logo-dark.svg" alt="Logo" />
            </div>
            <div className={styles.inputWrap}>
              <input
                className={`${styles.input} ${
                  this.state.username && styles.hasVal
                }`}
                type="text"
                value={this.state.username}
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                  });
                }}
                autoComplete="email"
              />
              <span
                className={styles.inputFocus}
                data-placeholder="Email"
              ></span>
            </div>
            <div className={styles.inputWrap}>
              <span
                className={styles.btnShowPass}
                onClick={(e) => {
                  this.setState({
                    showPassword: !this.state.showPassword,
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={this.state.showPassword ? "eye-slash" : "eye"}
                  size="sm"
                />
              </span>
              <input
                className={`${styles.input} ${
                  this.state.password && styles.hasVal
                }`}
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                autoComplete="current-password"
              />
              <span
                className={styles.inputFocus}
                data-placeholder="Password"
              ></span>
            </div>
            <button type="submit" className={`btn btn-block ${styles.loginBtn}`}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
