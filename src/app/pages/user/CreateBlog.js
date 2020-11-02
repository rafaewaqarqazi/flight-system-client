import React, { useEffect, useState } from "react";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { useHistory, useParams } from "react-router-dom";
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
import { createBlogValidations } from "../../../utils/validations/createBlogValidations";
import { shallowEqual, useSelector } from "react-redux";
import { createBlog, getBlogById, updateBlog } from "../../crud/blogs.crud";

const CreateBlog = ({ edit }) => {
  const history = useHistory();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [details, setDetails] = useState(null);

  const [success, setSuccess] = useState({ show: false, message: "" });
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  useEffect(() => {
    if (params.blogId && edit) {
      getBlogById(params.blogId)
        .then(result => {
          setDetails(result.data);
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }, []);
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
  const onDrop = (acceptedFiles, setFieldValue, images) => {
    console.log("images", images);
    setFieldValue("images", [...images, ...acceptedFiles]);
  };
  const onDropReject = files => {
    setError({ show: true, message: "Could not accept this file" });
    setTimeout(() => {
      setError({ show: false, message: "" });
    }, 2000);
  };
  const handleClickRemoveImage = (setFieldValue, images, i) => {
    setFieldValue(
      "images",
      images.filter((img, index) => index !== i)
    );
  };

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader title="Create Blog" />
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
                title: details?.title || "",
                description: details?.description || "",
                images: details?.images || []
              }}
              enableReinitialize
              validate={createBlogValidations}
              onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                enableLoading();
                const formData = new FormData();
                let oldImages = [];
                values.images.map(img => {
                  if (!img.filename) {
                    formData.append("files", img);
                  }
                  if (img.filename) {
                    oldImages = [...oldImages, img];
                  }
                });
                formData.append(
                  "details",
                  JSON.stringify({
                    title: values.title,
                    description: values.description,
                    author: user._id,
                    images: edit ? oldImages : undefined,
                    blogId: edit ? details?._id : undefined
                  })
                );
                const callApi = edit ? updateBlog : createBlog;
                callApi(formData)
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
                        history.push("/blogs");
                      }, 2000);
                    }
                    setSubmitting(false);
                  })
                  .catch(error => {
                    disableLoading();
                    setError({ show: true, message: "Could not create blog!" });
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
                  {console.log(values)}
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Blog Title</label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        name="title"
                        placeholder="Blog Title"
                      />
                      <ErrorMessage name="title" render={formErrorMessage} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">
                      Blog Description
                    </label>
                    <div className="col-10">
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.description}
                        onChange={(event, editor) => {
                          setFieldValue("description", editor.getData());
                        }}
                        config={{
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
                        name="description"
                        render={formErrorMessage}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Images</label>
                    <div className="col-10">
                      <div>
                        <Dropzone
                          onDrop={acceptedFiles =>
                            onDrop(acceptedFiles, setFieldValue, values.images)
                          }
                          accept="image/*"
                          onDropRejected={onDropReject}
                          multiple={true}
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
                                    <span>Drop the files here ...</span>
                                  ) : (
                                    <span>
                                      Drag 'n' drop images here, or click to
                                      select files
                                    </span>
                                  )}
                                </div>
                              </section>
                            )
                          }
                        </Dropzone>
                      </div>
                      <ErrorMessage name="images" render={formErrorMessage} />
                      {values.images?.map((img, i) => (
                        <div className="pdf-uploaded m-2">
                          <img
                            src={
                              img.filename
                                ? `/images/${img.filename}`
                                : URL.createObjectURL(img)
                            }
                            alt="blogImage"
                            width={150}
                          />
                          <div
                            className="fa fa-minus-circle"
                            onClick={() =>
                              handleClickRemoveImage(
                                setFieldValue,
                                values.images,
                                i
                              )
                            }
                          />
                        </div>
                      ))}
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
                        {edit ? "Update " : "Create "}
                        Blog
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

export default CreateBlog;
