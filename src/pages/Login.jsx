import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/Login.scss";

export default function Login({ cb }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (identifier && password) cb({ identifier, password });
  };
  return (
    <div className="form-container">
      <div className="backdrop">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="identifier">Identifier</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={({ target: { value } }) => {
                setIdentifier(value);
              }}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              required
            />
          </div>
          <div className="field">
            <input type="submit" value="Login" data-testid="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  cb: PropTypes.func,
};
Login.defaultProps = {
  cb: () => {},
};
