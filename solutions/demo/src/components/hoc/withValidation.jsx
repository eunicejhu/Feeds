import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "../../styles/validate.module.scss";

const withValidation = (WrappedComponent) => {
  class ValidatedComponent extends Component {
    state = {
      error: "",
    };

    handleValidate = (e) => {
      const { value, name } = e.target;
      const {
        validate_options: { minLength, maxLength, pattern },
      } = this.props;

      if (minLength && value.length < minLength) {
        this.setState({ error: `${name} length should be > ${minLength} ` });
      } else if (maxLength && value.length > maxLength) {
        this.setState({ error: `${name} length should be < ${maxLength} ` });
      } else if (pattern && !value.match(pattern)) {
        this.setState({ error: `${name} does not match ${pattern} ` });
      } else {
        this.setState({ error: "" });
      }
    };

    render() {
      const { error } = this.state;
      const { className, ...restProps } = this.props;
      return (
        <>
          <WrappedComponent
            className={`${className} ${!error ? "" : styles.errorInput}`}
            {...restProps}
            onInput={this.handleValidate}
          />
          <small className={styles.error}>{error}</small>
        </>
      );
    }
  }

  ValidatedComponent.propTypes = {
    className: PropTypes.string,
    validate_options: PropTypes.shape({
      maxLength: PropTypes.number,
      minLength: PropTypes.number,
      pattern: PropTypes.instanceOf(RegExp),
    }),
  };

  ValidatedComponent.defaultProps = {
    className: "",
    validate_options: {
      maxLength: 0,
      minLength: 0,
      pattern: null,
    },
  };

  return ValidatedComponent;
};

export default withValidation;
