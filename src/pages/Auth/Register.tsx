import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import Net from "../../utils/Net";
import { HCaptchaKey } from "./../../constants";
import RegisterModal from "./RegisterModal";
import $ from "jquery";

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
  days: string[];
  errorId: number;
  errorMessage?: string;
}

class Register extends React.Component<IProps, IState> {
  private hCaptchaRef: any = React.createRef();

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
      days: [],
      errorId: -1,
    };
  }

  changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let dayCount: number = 0;
    switch (e.target.value) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        dayCount = 31;
        break;
      case "02":
        dayCount = 29;
        break;
      case "04":
      case "06":
      case "09":
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
    if (!this.validateConfirmPassword(state.confirmPassword, state.password)) return false;
    if (!this.validateDay(state.birthDay)) return false;
    if (!this.validateMonth(state.birthMonth)) return false;
    if (!this.validateYear(state.birthYear)) return false;
    return true;
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.hCaptchaRef.current.execute();
  };

  handleCapchaVerification = (captchaToken: string) => {
    if (!this.validateInputs(this.state)) return;
    this.setState({
      errorId: -1,
      errorMessage: undefined,
    });
    Net.post("/api/auth/register", {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      birthDate: `${this.state.birthYear}-${this.state.birthMonth}-${this.state.birthDay}`,
      captcha: captchaToken,
      Language: "en",
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
          this.setState({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            birthDay: "default",
            birthMonth: "default",
            birthYear: "default",
            showPassword: false,
          });
          $("#registerConfirmationModal").modal("show");
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
              <span
                className={`${styles.checkIcon} ${
                  this.validateEmail(this.state.email) && styles.active
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    this.validateEmail(this.state.email) ? "check" : "times"
                  }
                  size="sm"
                />
              </span>
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
                className={styles.inputFocus}
                data-placeholder="Email"
              ></span>
            </div>
            <div className={styles.inputWrap}>
              <span
                className={`${styles.checkIcon} ${
                  this.validateUsername(this.state.username) && styles.active
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    this.validateUsername(this.state.username)
                      ? "check"
                      : "times"
                  }
                  size="sm"
                />
              </span>
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
                className={styles.inputFocus}
                data-placeholder="Username"
              ></span>
            </div>
            <div className={styles.inputWrap}>
              <span
                className={`${styles.checkIcon} ${
                  this.validatePassword(this.state.password) && styles.active
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    this.validatePassword(this.state.password)
                      ? "check"
                      : "times"
                  }
                  size="sm"
                />
              </span>
              <span
                className={`${styles.btnShowPass} ${styles.paddingRight}`}
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
                className={styles.inputFocus}
                data-placeholder="Password"
              ></span>
            </div>
            <div className={styles.inputWrap}>
              <span
                className={`${styles.checkIcon} ${
                  this.validateConfirmPassword(
                    this.state.confirmPassword,
                    this.state.password
                  ) && styles.active
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    this.validateConfirmPassword(
                      this.state.confirmPassword,
                      this.state.password
                    )
                      ? "check"
                      : "times"
                  }
                  size="sm"
                />
              </span>
              <span
                className={`${styles.btnShowPass} ${styles.paddingRight}`}
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
                className={styles.inputFocus}
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
                  <span
                    className={`${styles.checkIcon} ${
                      this.validateMonth(this.state.birthMonth) && styles.active
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        this.validateMonth(this.state.birthMonth)
                          ? "check"
                          : "times"
                      }
                      size="sm"
                    />
                  </span>
                  <select
                    className={`${styles.select} ${
                      this.state.birthMonth && styles.hasVal
                    }`}
                    onChange={this.changeMonth}
                    value={this.state.birthMonth}
                  >
                    <option disabled value="default"></option>
                    <option value="01">{t("month.january")}</option>
                    <option value="02">{t("month.february")}</option>
                    <option value="03">{t("month.march")}</option>
                    <option value="04">{t("month.april")}</option>
                    <option value="05">{t("month.may")}</option>
                    <option value="06">{t("month.june")}</option>
                    <option value="07">{t("month.july")}</option>
                    <option value="08">{t("month.august")}</option>
                    <option value="09">{t("month.september")}</option>
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
                  <span
                    className={`${styles.checkIcon} ${
                      this.validateDay(this.state.birthDay) && styles.active
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        this.validateDay(this.state.birthDay)
                          ? "check"
                          : "times"
                      }
                      size="sm"
                    />
                  </span>
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
                  <span
                    className={`${styles.checkIcon} ${
                      this.validateYear(this.state.birthYear) && styles.active
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        this.validateYear(this.state.birthYear)
                          ? "check"
                          : "times"
                      }
                      size="sm"
                    />
                  </span>
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
            <div className="text-center">
              <HCaptcha
                ref={this.hCaptchaRef}
                sitekey={HCaptchaKey}
                theme="dark"
                size="invisible"
                onVerify={this.handleCapchaVerification}
              />
            </div>
            <button
              type="submit"
              disabled={!this.validateInputs(this.state)}
              className={`btn btn-block ${styles.loginBtn}`}
            >
              Register
            </button>
          </form>
        </div>
        <RegisterModal />
      </div>
    );
  }
}

export default withTranslation()(Register);
