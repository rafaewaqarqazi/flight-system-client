import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import { requestPassword } from "../../crud/auth.crud";
import clsx from "clsx";
import LoginLayout from "../../Components/layout/login/LoginLayout";

const ForgotPassword = ({ intl }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
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
      <LoginLayout heading="Forgot Password ?">
        <Formik
          initialValues={{ email: "" }}
          validate={values => {
            const errors = {};

            if (!values.email) {
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

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            enableLoading()
            requestPassword(values.email)
              .then(() => {
                disableLoading()
                setSubmitting(false);
                setSuccess(true)
                setTimeout(() => {
                  history.push('/auth/login')
                }, 3000)
              })
              .catch(() => {
                disableLoading()
                setSubmitting(false);
                setStatus(
                  intl.formatMessage(
                    { id: "AUTH.VALIDATION.NOT_FOUND" },
                    { name: values.email }
                  )
                );
              });
          }}
        >
          {({status, handleSubmit, isSubmitting}) => (
            <Form className="kt-form" onSubmit={handleSubmit}>
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}
              {success && (
                <div role="alert" className="alert alert-success">
                  <div className="alert-text">Email Sent Successfully!</div>
                </div>
              )}
              <div className="text-body">
                If you have forgotten your password, please enter your account's
                email address below and click the "Reset My Password" button. You
                will receive an email that contains a link to set a new password
              </div>
              <div className="input-group">
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
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
                  Reset My Password
                </button>
              </div>
              <div className="kt-login__account">
                <span className="kt-login__account-msg">
                  Return to Login Page ?
                </span>
                &nbsp;&nbsp;
                <Link to="/auth/login" className="kt-login__account-link">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </div>
  );
};

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
