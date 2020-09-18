import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import Net from "../../utils/Net";

import styles from "./Auth.module.scss";

interface IProps extends WithTranslation {}

interface IState {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  showPassword: boolean;
  ok: boolean;
  days: string[];
  errorId: number;
  errorMessage?: string;
}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDay: "default",
      birthMonth: "default",
      birthYear: "default",
      showPassword: false,
      ok: true,
      days: [],
      errorId: -1,
    };
  }

  changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let dayCount: number = 0;
    switch (e.target.value) {
      case "1":
      case "3":
      case "5":
      case "7":
      case "8":
      case "10":
      case "12":
        dayCount = 31;
        break;
      case "2":
        dayCount = 29;
        break;
      case "4":
      case "6":
      case "9":
      case "11":
        dayCount = 30;
        break;
    }
    let days: string[] = [];
    for (let i = 1; i <= dayCount; i++) {
      days.push(i.toString());
    }
    this.setState({
      birthMonth: e.target.value,
      days: days,
    });
  };

  validateEmail(value?: string): boolean {
    if (value == null) return false;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    return value.length >= 8;
  }

  validateConfirmPassword(value?: string, original?: string): boolean {
    if (value == null) return false;
    if (original == null) return false;
    value = value.replace(/\s/g, "");
    if (value.length < 8) return false;
    return value === original;
  }

  validateDay(value?: string): boolean {
    if (value == null) return false;
    return /^-?\d+$/.test(value);
  }

  validateMonth(value?: string): boolean {
    if (value == null) return false;
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

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      errorId: -1,
      errorMessage: undefined,
    });
    e.preventDefault();
    Net.post("/api/auth/register", {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      birthDate: `${this.state.birthDay}-${this.state.birthMonth}-${this.state.birthYear}`,
      captcha: "",
      Language: "en",
    })
      .then((e) => {
        if (e.data.error) {
          this.setState({
            errorId: e.data.error.code,
            errorMessage: e.data.error.message,
          });
          return;
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
      })
      .finally(() => {});
  };

  render() {
    const { t, i18n } = this.props;
    let date = new Date();
    let years = [];
    let possibleYear = date.getFullYear() - 1;
    for (let i = 0; i < 120; i++) {
      years.push(possibleYear - i);
    }
    return (
      <div className={styles.container}>
        <div className={`${styles.wrapper} ${styles.registerWrapper}`}>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.logo}>
              <img src="images/logo-dark.svg" alt="Logo" />
            </div>
            <div
              className={`${styles.errorBubble} ${
                this.state.errorId > -1 && styles.errorBubbleShow
              }`}
            >
              {this.state.errorId > -1 &&
              i18n.exists("error.register." + this.state.errorId.toString())
                ? t("error.register." + this.state.errorId.toString())
                : this.state.errorMessage}
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
                    onChange={this.changeMonth}
                    value={this.state.birthMonth}
                  >
                    <option disabled value="default"></option>
                    <option value="1">{t("month.january")}</option>
                    <option value="2">{t("month.february")}</option>
                    <option value="3">{t("month.march")}</option>
                    <option value="4">{t("month.april")}</option>
                    <option value="5">{t("month.may")}</option>
                    <option value="6">{t("month.june")}</option>
                    <option value="7">{t("month.july")}</option>
                    <option value="8">{t("month.august")}</option>
                    <option value="9">{t("month.september")}</option>
                    <option value="10">{t("month.october")}</option>
                    <option value="11">{t("month.november")}</option>
                    <option value="12">{t("month.december")}</option>
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
                    <option disabled value="default"></option>
                    {this.state.days.map((day, index) => (
                      <option key={index} value={day.toString()}>
                        {day}
                      </option>
                    ))}
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
                    <option disabled value="default"></option>
                    {years.map((year, index) => (
                      <option key={index} value={year.toString()}>
                        {year}
                      </option>
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

export default withTranslation()(Register);
