import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { bookWorldTour, deleteWorldTourPackage } from "../../crud/flights.crud";
import { Modal, Spinner, Table, Carousel } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { shallowEqual, useSelector } from "react-redux";
import AlertSuccess from "../../Components/alerts/AlertSuccess";
import AlertError from "../../Components/alerts/AlertError";
import Login from "../auth/Login";
import { useParams } from "react-router-dom";
import { getBlogById, removeBlog } from "../../crud/blogs.crud";
import moment from "moment";

const BlogDetails = () => {
  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [details, setDetails] = useState(null);
  const [response, setResponse] = useState({
    success: {
      show: false,
      message: ""
    },
    error: {
      show: false,
      message: ""
    }
  });
  const closeAlert = () => {
    setResponse({
      success: {
        show: false,
        message: ""
      },
      error: {
        show: false,
        message: ""
      }
    });
  };
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  useEffect(() => {
    setLoading(true);
    if (params.blogId) {
      getBlogById(params.blogId)
        .then(result => {
          console.log("result", result);
          setDetails(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      history.push("/blogs");
    }
  }, []);

  const handleDeleteBlog = () => {
    removeBlog(details._id)
      .then(res => {
        setDeleteConfirm(false);
        setResponse({
          success: {
            show: true,
            message: `Blog Deleted Successfully!`
          },
          error: {
            show: false,
            message: ""
          }
        });
        setTimeout(() => {
          history.push("/blogs");
        }, 2000);
      })
      .catch(() => {
        setResponse({
          success: {
            show: false,
            message: ""
          },
          error: {
            show: true,
            message: "Could not delete blog"
          }
        });
      });
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title={details?.title}
          toolbar={
            <PortletHeaderToolbar>
              {user?._id === details?.author?._id && (
                <>
                  <Link
                    to={`/blogs/edit/${details?._id}`}
                    className="btn btn-sm btn-label mx-2"
                  >
                    Edit Blog
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setDeleteConfirm(true)}
                  >
                    Delete Blog
                  </button>
                </>
              )}
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <AlertSuccess
            show={response.success.show}
            message={response.success.message}
            handleClose={closeAlert}
          />
          <AlertError
            show={response.error.show}
            message={response.error.message}
            handleClose={closeAlert}
          />
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : (
            <div>
              <Carousel>
                {details?.images?.map((img, i) => (
                  <Carousel.Item key={i} style={{ height: 500 }}>
                    <img
                      className="d-block w-100"
                      src={`/images/${img.filename}`}
                      style={{ height: "100%" }}
                      alt="images"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="mt-5">
                <h5 className="text-dark">{details?.title}</h5>
                <div className="text-dark kt-font-sm mb-4">
                  Author: {details?.author?.firstName}{" "}
                  {details?.author?.lastName} -{" "}
                  {moment(details?.createdAt).fromNow()}
                </div>
                <div className="border-0-editor text-dark">
                  <CKEditor
                    editor={ClassicEditor}
                    data={details?.description}
                    disabled
                    config={{
                      toolbar: null
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </PortletBody>
      </Portlet>
      <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger btn-outlined"
            onClick={handleDeleteBlog}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogDetails;
