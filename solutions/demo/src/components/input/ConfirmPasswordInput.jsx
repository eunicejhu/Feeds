import React from "react";

import style from "./ConfirmPasswordInput.module.scss";

const VALIDATE_OPTIONS = {
  minLength: [6, "Length should be greater than 6"],
  maxLength: [22, "Length should be less than 22"],
  pattern: [
    /.*[a-z]+.*[A-Z]+.*/g,
    "Should contain at least one uppercase and one lowercase letter",
  ],
};

// Password should be 6-22 length, at least one uppercase and one lowercase
// customize validaty message

const validate = (value, options, cb) => {
  const { minLength, maxLength, pattern } = options;
  if (value.length < minLength[0]) {
    cb(minLength[1]);
  } else if (value.length > maxLength[0]) {
    cb(maxLength[1]);
  } else if (!value.match(pattern[0])) {
    cb(pattern[1]);
  } else {
    cb("");
  }
};

class ConfirmPasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: "",
      confirmPwd: "",
      error: { pwd: "", confirmPwd: "" },
    };
  }

  handlePwdInputChange = (e) => {
    const { value } = e.target;
    const errorCb = (message) =>
      this.setState((prevState) => ({
        ...prevState,
        ...{ error: { ...prevState.error, pwd: message } },
      }));
    this.setState((prevState) => ({
      ...prevState,
      pwd: value,
      confirmPwd: "",
      ...{ error: { ...prevState.error, confirmPwd: "" } },
    }));
    validate(value, VALIDATE_OPTIONS, errorCb);
  };

  handleConfirmPwdInputChange = (e) => {
    const { value } = e.target;
    const { pwd } = this.state;
    this.setState((prevState) => ({ ...prevState, confirmPwd: value }));
    if (value !== pwd) {
      this.setState((prevState) => ({
        ...prevState,
        ...{
          error: {
            ...prevState.error,
            confirmPwd: "Password is not identical",
          },
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        ...{ error: { ...prevState.error, confirmPwd: "" } },
      }));
    }
  };

  render() {
    const { pwd, confirmPwd, error } = this.state;
    return (
      <>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            aria-label="Input Password"
            onChange={this.handlePwdInputChange}
            className={!error.pwd ? "" : style.invalid}
            value={pwd}
          />
          <small className={style.error}>{error.pwd}</small>
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            required
            aria-label="confirm password"
            onChange={this.handleConfirmPwdInputChange}
            className={!error.confirmPwd ? "" : style.invalid}
            value={confirmPwd}
          />
          <small className={style.error}>{error.confirmPwd}</small>
        </div>
      </>
    );
  }
}

export default ConfirmPasswordInput;
