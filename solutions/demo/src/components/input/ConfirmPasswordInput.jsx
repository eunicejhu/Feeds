import React, { useState } from "react";

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

const ConfirmPasswordInput = () => {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState({ pwd: "", confirmPwd: "" });
  const handlePwdInputChange = (e) => {
    const { value } = e.target;
    const cb = (message) => setError({ pwd: message });
    setPwd(value);
    validate(value, VALIDATE_OPTIONS, cb);
  };
  const handleConfirmPwdInputChange = (e) => {
    const { value } = e.target;
    setConfirmPwd(value);
    if (value !== pwd) {
      setError({ confirmPwd: "Password is not identical" });
    } else {
      setError({ confirmPwd: "" });
    }
  };

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
          onChange={handlePwdInputChange}
          className={!!error.pwd && style.invalid}
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
          onChange={handleConfirmPwdInputChange}
          className={!!error.confirmPwd && style.invalid}
          value={confirmPwd}
        />
        <small className={style.error}>{error.confirmPwd}</small>
      </div>
    </>
  );
};

export default ConfirmPasswordInput;
