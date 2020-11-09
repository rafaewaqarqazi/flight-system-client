import React, { useState } from "react";
import { login } from "../../crud/auth.crud";
import { Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as auth from "../../store/ducks/auth.duck";

const LoginForm = ({ isModal, intl, handleLogin, ...props }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [passwordField, setPasswordField] = useState(true);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validate={values => {
        const errors = {};

        if (!values.email) {
          // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
          errors.email = intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED_FIELD"
          });
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = intl.formatMessage({
            id: "AUTH.VALIDATION.INVALID_FIELD"
          });
        }

        if (!values.password) {
          errors.password = intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED_FIELD"
          });
        }

        return errors;
      }}
      onSubmit={(values, { setStatus, setSubmitting }) => {
        enableLoading();
        setTimeout(() => {
          login(values.email, values.password)
            .then(res => {
              disableLoading();
              props.login(res.data.authToken);
              props.fulfillUser(res.data.user);
              if (isModal) {
                handleLogin();
              } else {
                history.push("/");
              }
            })
            .catch(() => {
              disableLoading();
              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN"
                })
              );
            });
        }, 1000);
      }}
    >
      {({
        values,
        status,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form className="kt-form" onSubmit={handleSubmit}>
          {status && (
            <div role="alert" className="alert alert-danger">
              <div className="alert-text">{status}</div>
            </div>
          )}

          <div className="input-group">
            <Field
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group position-relative">
            <Field
              name="password"
              type={passwordField ? "password" : "text"}
              className="form-control"
              placeholder="Password"
              required
            />
            <span
              className="position-absolute"
              style={{ right: 10, bottom: 13, cursor: "pointer" }}
              onClick={() => setPasswordField(!passwordField)}
            >
              <i
                className={`fa ${passwordField ? "fa-eye" : "fa-eye-slash"}`}
              />
            </span>
          </div>
          <div className="row kt-login__extra">
            <div className="col kt-align-right">
              <Link to="/auth/forgot-password" className="kt-login__link">
                Forget Password ?
              </Link>
            </div>
          </div>
          <div className="kt-login__actions">
            <button
              // className="btn btn-brand btn-elevate kt-login__btn-primary"
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                {
                  "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                }
              )}`}
              style={loadingButtonStyle}
            >
              Sign In
            </button>
          </div>
          <div className="kt-login__account">
            <span className="kt-login__account-msg">
              Don't have an account yet ?
            </span>
            &nbsp;&nbsp;
            <Link
              to="/auth/registration"
              id="kt_login_signup"
              className="kt-login__account-link"
            >
              Sign Up!
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default injectIntl(connect(null, auth.actions)(LoginForm));
