import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./Auth.module.scss";

type IProps = {};

type IState = {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  showPassword: boolean;
  ok: boolean;
};

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      showPassword: false,
      ok: true,
    };
  }

  validateEmail(value?: string): boolean {
    if (value == null) return false;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(value).toLowerCase());
  }

  validateUsername(value?: string): boolean {
    if (value == null) return false;
    const usernameRegex = /^[0-9a-zA-Z-_.]{3,32}$/;
    return usernameRegex.test(String(value));
  }

  validatePassword(value?: string): boolean {
    if (value == null) return false;
    value = value.replace(/\s/g, "");
    return value.length > 8;
  }

  validateConfirmPassword(value?: string, original?: string): boolean {
    if (value == null) return false;
    if (original == null) return false;
    return value === original;
  }

  validateDay(value?: string): boolean {
    if (value == null) return false;
    return /^-?\d+$/.test(value);
  }

  validateMonth(value?: string): boolean {
    if (value == null) return false;
    console.warn(value);
    return /^-?\d+$/.test(value);
  }

  validateYear(value?: string): boolean {
    if (value == null) return false;
    return /^-?\d+$/.test(value);
  }

  validateInputs(state: IState): boolean {
    if (!this.validateEmail(state.email)) return false;
    if (!this.validateUsername(state.username)) return false;
    if (!this.validatePassword(state.password)) return false;
    if (!this.validateConfirmPassword(state.confirmPassword, state.password))
      return false;
    return true;
  }

  render() {
    let date = new Date();
    let years = [];
    let possibleYear = date.getFullYear() - 1;
    for (let i = 0; i < 120; i++) {
      years.push(possibleYear - i);
    }
    return (
      <div className={styles.container}>
        <div className={`${styles.wrapper} ${styles.registerWrapper}`}>
          <form>
            <div className={styles.logo}>
              <img src="images/logo-dark.svg" alt="Logo" />
            </div>
            <div className={styles.inputWrap}>
              <input
                className={`${styles.input} ${
                  this.state.email && styles.hasVal
                }`}
                type="text"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
                autoComplete="email"
              />
              <span
                className={`${styles.inputFocus} ${
                  this.validateEmail(this.state.email) && styles.ok
                }`}
                data-placeholder="Email"
              ></span>
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
                autoComplete="username"
              />
              <span
                className={`${styles.inputFocus} ${
                  this.validateUsername(this.state.username) && styles.ok
                }`}
                data-placeholder="Username"
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
                autoComplete="new-password"
              />
              <span
                className={`${styles.inputFocus} ${
                  this.validatePassword(this.state.password) && styles.ok
                }`}
                data-placeholder="Password"
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
                  this.state.confirmPassword && styles.hasVal
                }`}
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.confirmPassword}
                onChange={(e) => {
                  this.setState({
                    confirmPassword: e.target.value,
                  });
                }}
                autoComplete="new-password"
              />
              <span
                className={`${styles.inputFocus} ${
                  this.validateConfirmPassword(
                    this.state.confirmPassword,
                    this.state.password
                  ) && styles.ok
                }`}
                data-placeholder="Confirm Password"
              ></span>
            </div>
            <div className={styles.dateContainer}>
              <span className={styles.dateTitle}>Date of birth</span>
              <span className={styles.dateDescription}>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </span>
              <div className="d-flex flex-wrap">
                <div className={`${styles.dateWrap} flex-fill m-1`}>
                  <select
                    className={`${styles.select} ${
                      this.state.birthMonth && styles.hasVal
                    }`}
                    onChange={(e) => {
                      this.setState({
                        birthMonth: e.target.value,
                      });
                    }}
                    value={this.state.birthMonth}
                  >
                    <option disabled selected></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <span
                    className={`${styles.inputFocus} ${
                      this.validateMonth(this.state.birthMonth) && styles.ok
                    }`}
                    data-placeholder="Month"
                  ></span>
                </div>
                <div className={`${styles.dateWrap} flex-fill m-1`}>
                  <select
                    className={`${styles.select} ${
                      this.state.birthDay && styles.hasVal
                    }`}
                    onChange={(e) => {
                      this.setState({
                        birthDay: e.target.value,
                      });
                    }}
                    value={this.state.birthDay}
                  >
                    <option disabled selected></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <span
                    className={`${styles.inputFocus} ${
                      this.validateDay(this.state.birthDay) && styles.ok
                    }`}
                    data-placeholder="Day"
                  ></span>
                </div>
                <div className={`${styles.dateWrap} flex-fill m-1`}>
                  <select
                    className={`${styles.select} ${
                      this.state.birthYear && styles.hasVal
                    }`}
                    onChange={(e) => {
                      this.setState({
                        birthYear: e.target.value,
                      });
                    }}
                    value={this.state.birthYear}
                  >
                    <option disabled selected></option>
                    {years.map((year) => (
                      <option value={year.toString()}>{year}</option>
                    ))}
                  </select>
                  <span
                    className={`${styles.inputFocus} ${
                      this.validateYear(this.state.birthYear) && styles.ok
                    }`}
                    data-placeholder="Year"
                  ></span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`btn btn-block ${styles.loginBtn} ${
                this.validateInputs(this.state) && styles.active
              }`}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
