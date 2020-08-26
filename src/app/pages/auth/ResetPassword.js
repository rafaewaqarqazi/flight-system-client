import React, { useState } from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import { resetPassword } from "../../crud/auth.crud";
import clsx from "clsx";
import LoginLayout from "../../Components/layout/login/LoginLayout";
import {Alert} from "react-bootstrap";
import {formErrorMessage} from "../errors/FormErrorMessage";

const ResetPassword = ({ intl }) => {
  const history = useHistory();
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
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
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }
  return (
    <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
      <LoginLayout heading="Reset Password">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: '' }}
          validate={values => {
            const errors = {};

            if (!values.newPassword) {
              errors.newPassword = 'Required!'
            } else if (!values.newPassword.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
              errors.newPassword = 'Invalid Password!'
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required!'
            } else if (values.newPassword !== values.confirmPassword) {
              errors.confirmPassword = 'Password Does not Match!'
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            enableLoading()
            resetPassword({resetPasswordLink: params.token, newPassword: values.newPassword})
              .then((res) => {
                disableLoading()
                setSubmitting(false);
                if (!res.data.success) {
                  setError({show: true, message: res.data.message})
                  closeAlert()
                } else {
                  setSuccess({show: true, message: res.data.message})
                  closeAlert()
                  setTimeout(() => {
                    history.push('/auth/login')
                  },2000)
                }
              })
              .catch(() => {
                disableLoading()
                setSubmitting(false);
                setError({show: true, message: 'Something Went Wrong!'})
              });
          }}
        >
          {({status, handleSubmit, isSubmitting}) => (
            <Form className="kt-form" onSubmit={handleSubmit}>
              <Alert show={success.show} variant="success">{success.message}</Alert>
              <Alert show={error.show} variant="danger">{error.message}</Alert>
              <div className="form-group">
                <Field type="password" className="form-control" name="newPassword" placeholder="New password"/>
                <ErrorMessage name='newPassword' render={formErrorMessage}/>
              </div>
              <div className="form-group">
                <Field type="password" className="form-control" name="confirmPassword" placeholder="Verify password"/>
                <ErrorMessage name='confirmPassword' render={formErrorMessage}/>
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

export default injectIntl(connect(null, auth.actions)(ResetPassword));
