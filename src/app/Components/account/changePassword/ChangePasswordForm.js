import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {changePassword} from "../../../crud/auth.crud";
import { changePasswordValidations } from "../../../../utils/validations/changePasswordValidations";
import {Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import {connect} from "react-redux";
const ChangePasswordForm = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "1rem" });
  };
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }}
      validate={changePasswordValidations}
      onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
        enableLoading();
        changePassword({...values, userId: user._id, confirmPassword: undefined})
          .then(res => {
            if (!res.data.success) {
              disableLoading();
              setError({show: true, message: res.data.message})
              closeAlert()
            } else {
              disableLoading();
              setSuccess({show: true, message: res.data.message})
              closeAlert()
              resetForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
              })
            }
            setSubmitting(false)
          })
          .catch((error) => {
            disableLoading();
            setSubmitting(false);
            setError({show: true, message: 'Could not change password'})
            closeAlert()
          });
      }}
    >
      {({status, handleSubmit, isSubmitting, resetForm}) =>
        <Form onSubmit={handleSubmit} className="kt-form kt-form--label-right">
          <div className="kt-portlet__body">
            <div className="kt-section kt-section--first">
              <div className="kt-section__body">
                <Alert show={success.show} variant="success">{success.message}</Alert>
                <Alert show={error.show} variant="danger">{error.message}</Alert>
                <div className="row">
                  <label className="col-xl-3" />
                  <div className="col-lg-9 col-xl-6">
                    <h3 className="kt-section__title kt-section__title-sm">
                      Change Or Recover Your Password:
                    </h3>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Current Password
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <Field type="password" className="form-control" name='oldPassword' placeholder="Current password"/>
                    <Link to="/auth/forgot-password" className="kt-link kt-font-sm kt-font-bold kt-margin-t-5">
                      Forgot password ?
                    </Link>
                    <ErrorMessage name='oldPassword' render={formErrorMessage}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    New Password
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <Field type="password" className="form-control" name="newPassword" placeholder="New password"/>
                    <ErrorMessage name='newPassword' render={formErrorMessage}/>
                  </div>
                </div>
                <div className="form-group form-group-last row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Verify Password
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <Field type="password" className="form-control" name="confirmPassword" placeholder="Verify password"/>
                    <ErrorMessage name='confirmPassword' render={formErrorMessage}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="kt-portlet__foot">
            <div className="kt-form__actions">
              <div className="row">
                <div className="col-lg-3 col-xl-3"/>
                <div className="col-lg-9 col-xl-9">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}
                    style={loadingButtonStyle}
                    disabled={isSubmitting}
                  >
                    Change Password
                  </button>
                  &nbsp;
                  <button type='button' onClick={() =>{setSuccess(false); resetForm({})}} className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      }
    </Formik>
  );
};
const mapStateToProps = ({ auth: { user } }) => ({
  user
});
export default connect(mapStateToProps)(ChangePasswordForm);
