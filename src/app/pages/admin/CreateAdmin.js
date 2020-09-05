import React, {useState} from 'react';
import {Alert} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createAdmin} from "../../crud/auth.crud";
import {formErrorMessage} from "../errors/FormErrorMessage";
import InputCountry from "../../Components/input/InputCountry";
import clsx from "clsx";
import {useHistory} from 'react-router-dom'
import {adminCreateValidations} from "../../../utils/validations/adminCreateValidations";
const CreateAdmin = () => {
  const history = useHistory()
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
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Create Admin'
        />
        <PortletBody>
          <div className="row container">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                country: '',
                mobileNo: ''
              }}
              validate={adminCreateValidations}
              onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                enableLoading();
                createAdmin({...values})
                  .then(res => {
                    if (!res.data.success) {
                      disableLoading();
                      setError({show: true, message: res.data.message})
                      closeAlert()
                    } else {
                      disableLoading();
                      setSuccess({show: true, message: res.data.message})
                      closeAlert()
                      setTimeout(() => {
                        history.push('/admins')
                      }, 2000)
                    }
                    setSubmitting(false)
                  })
                  .catch((error) => {
                    disableLoading();
                    setError({show: true, message: 'Could not create lawyer!'})
                    setSubmitting(false)
                    closeAlert()
                  });
              }}
            >
              {({handleSubmit, isSubmitting}) =>
                <Form onSubmit={handleSubmit} className='w-100'>
                  <div className="row">
                    <label className="col-xl-3" />
                    <div className="col-lg-9 col-xl-6">
                      <h3 className="kt-section__title kt-section__title-sm">
                        Provide Admin Details here:
                      </h3>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      First Name
                    </label>
                    <div className="col-10">
                      <Field className="form-control" name='firstName' placeholder="First Name"/>
                      <ErrorMessage name='firstName' render={formErrorMessage}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Last Name
                    </label>
                    <div className="col-10">
                      <Field className="form-control" name="lastName" placeholder="Last Name"/>
                      <ErrorMessage name='lastName' render={formErrorMessage}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Email
                    </label>
                    <div className="col-10">
                      <Field type='email' className="form-control" name="email" placeholder="someone@example.com"/>
                      <ErrorMessage name='email' render={formErrorMessage}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Mobile No
                    </label>
                    <div className="col-10">
                      <Field className="form-control" name="mobileNo" placeholder="03XXXXXXXXX"/>
                      <ErrorMessage name='mobileNo' render={formErrorMessage}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Address
                    </label>
                    <div className="col-10">
                      <Field className="form-control" name="address" placeholder="Address"/>
                      <ErrorMessage name='address' render={formErrorMessage}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Country
                    </label>
                    <div className="col-10">
                      <InputCountry/>
                      <ErrorMessage name='country' render={formErrorMessage}/>
                    </div>
                  </div>

                  <div className="kt-form__actions pt-3" style={{borderTop: '1px solid #ebedf2'}}>
                    <div className="d-flex justify-content-end">
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
                        Create Admin
                      </button>
                    </div>
                  </div>
                </Form>
              }
            </Formik>
          </div>
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default CreateAdmin;