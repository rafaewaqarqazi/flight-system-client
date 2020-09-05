import React, { useState } from "react";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createWorldTour } from "../../crud/flights.crud";
import { formErrorMessage } from "../errors/FormErrorMessage";
import InputCountry from "../../Components/input/InputCountry";
import Dropzone from "react-dropzone";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import clsx from "clsx";
import { worldTourCreateValidations } from "../../../utils/validations/worldTourCreateValidations";

const CreateWorldTour = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [success, setSuccess] = useState({ show: false, message: "" });
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
      setError({ show: false, message: "" });
      setSuccess({ show: false, message: "" });
    }, 3000);
  };
  const onDrop = (acceptedFiles, setFieldValue) => {
    setFieldValue("packageImage", acceptedFiles[0]);
  };
  const onDropReject = files => {
    setError({ show: true, message: "Could not accept this file" });
    setTimeout(() => {
      setError({ show: false, message: "" });
    }, 2000);
  };
  const handleClickRemoveImage = setFieldValue => {
    setFieldValue("packageImage", null);
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader title="Create World Tour" />
        <PortletBody>
          <Alert show={success.show} variant="success">
            {success.message}
          </Alert>
          <Alert show={error.show} variant="danger">
            {error.message}
          </Alert>
          <div className="row container">
            <Formik
              initialValues={{
                country: "",
                packageTitle: "",
                packagePrice: "",
                packageDescription: "",
                packageImage: null
              }}
              validate={worldTourCreateValidations}
              onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                enableLoading();
                const formData = new FormData();
                formData.append("file", values.packageImage);
                formData.append(
                  "details",
                  JSON.stringify({ ...values, packageImage: undefined })
                );
                createWorldTour(formData)
                  .then(res => {
                    if (!res.data.success) {
                      disableLoading();
                      setError({ show: true, message: res.data.message });
                      closeAlert();
                    } else {
                      disableLoading();
                      setSuccess({ show: true, message: res.data.message });
                      closeAlert();
                      setTimeout(() => {
                        history.push("/world-tour");
                      }, 2000);
                    }
                    setSubmitting(false);
                  })
                  .catch(error => {
                    disableLoading();
                    setError({ show: true, message: "Could not create Tour!" });
                    setSubmitting(false);
                    closeAlert();
                  });
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                values,
                setFieldValue,
                errors
              }) => (
                <Form onSubmit={handleSubmit} className="w-100">
                  <div className="row">
                    <label className="col-xl-3" />
                    <div className="col-lg-9 col-xl-6">
                      <h3 className="kt-section__title kt-section__title-sm">
                        Provide Tour Details here:
                      </h3>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Country</label>
                    <div className="col-10">
                      <InputCountry />
                      <ErrorMessage name="country" render={formErrorMessage} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Package Title
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        name="packageTitle"
                        placeholder="Package Title"
                      />
                      <ErrorMessage
                        name="packageTitle"
                        render={formErrorMessage}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Package Price
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        name="packagePrice"
                        type="number"
                        placeholder="Package Price"
                      />
                      <ErrorMessage
                        name="packagePrice"
                        render={formErrorMessage}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Package Description
                    </label>
                    <div className="col-10">
                      <CKEditor
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                          setFieldValue("packageDescription", editor.getData());
                        }}
                        config={{
                          ckfinder: {
                            uploadUrl:
                              "/api/flights/world-tour/editorImage/images"
                          },
                          toolbar: {
                            items: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "|",
                              "bulletedList",
                              "numberedList",
                              "indent",
                              "|",
                              "undo",
                              "redo"
                            ]
                          }
                        }}
                      />
                      <ErrorMessage
                        name="packageDescription"
                        render={formErrorMessage}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Header Image</label>
                    <div className="col-10">
                      <div>
                        <Dropzone
                          onDrop={acceptedFiles =>
                            onDrop(acceptedFiles, setFieldValue)
                          }
                          accept="image/*"
                          onDropRejected={onDropReject}
                          multiple={false}
                        >
                          {({ getRootProps, getInputProps, isDragActive }) =>
                            getRootProps &&
                            getInputProps && (
                              <section>
                                <div
                                  {...getRootProps({
                                    className: `base-style ${
                                      isDragActive ? "active-style" : ""
                                    }`
                                  })}
                                >
                                  <input {...getInputProps()} />
                                  {isDragActive ? (
                                    <span>Drop the file here ...</span>
                                  ) : (
                                    <span>
                                      Drag 'n' drop cover image here, or click
                                      to select file
                                    </span>
                                  )}
                                </div>
                              </section>
                            )
                          }
                        </Dropzone>
                      </div>
                      <ErrorMessage
                        name="packageImage"
                        render={formErrorMessage}
                      />
                      {values.packageImage && (
                        <div className="pdf-uploaded">
                          <img
                            src={URL.createObjectURL(values.packageImage)}
                            alt="packageImage"
                            width={150}
                          />
                          <div
                            className="fa fa-minus-circle"
                            onClick={() =>
                              handleClickRemoveImage(setFieldValue)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="kt-form__actions pt-3"
                    style={{ borderTop: "1px solid #ebedf2" }}
                  >
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
                        Create Tour
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default CreateWorldTour;
