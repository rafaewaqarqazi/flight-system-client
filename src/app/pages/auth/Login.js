import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";
import LoginLayout from "../../Components/layout/login/LoginLayout";
import "../../../_metronic/_assets/sass/pages/login/login-3.scss";

function Login(props) {
  const history = useHistory()
  const { intl } = props;
  const [loading, setLoading] = useState(false);
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
    <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
      <LoginLayout heading="Sign to Suits">
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
                .then((res) => {
                  disableLoading();
                  props.login(res.data.authToken);
                  props.fulfillUser(res.data.user)
                  history.push('/')
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
              <div className="input-group">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
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
      </LoginLayout>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
