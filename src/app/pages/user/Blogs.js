import React, { useEffect, useState } from "react";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { getUmrahDeals } from "../../crud/flights.crud";
import { getAllBlogs } from "../../crud/blogs.crud";
import moment from "moment";
import { removeHTMLTags } from "../../../utils";
import PaginationComponent from "../../Components/PaginationComponent";

const Blogs = () => {
  const [filters, setFilters] = useState({
    blogs: false,
    search: ""
  });
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then(res => {
        console.log("res", res);
        setBlogs(res.data.blogs);
        setFilteredBlogs(res.data.blogs);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(error => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);
  const onChangeSearch = event => {
    setFilters({ ...filters, search: event.target.value });
  };
  useEffect(() => {
    setFilteredBlogs(
      filters.blogs
        ? blogs.filter(blog => blog.author?._id === user._id)
        : blogs
    );
  }, [filters, blogs]);

  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Blogs"
          toolbar={
            <PortletHeaderToolbar>
              {user?.role === "1" && (
                <Dropdown
                  isOpen={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  <DropdownToggle
                    className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                    caret
                  >
                    {filters.blogs ? "My Blogs" : "All Blogs"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, blogs: false })}
                    >
                      All Blogs
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, blogs: true })}
                    >
                      My Blogs
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              {user?.role === "1" && (
                <Link to="/blogs/create" className="btn btn-label btn-sm">
                  <i className="fa fa-plus" /> Add New Blog
                </Link>
              )}
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 100, fontSize: 20 }}
            >
              No Blogs Found!
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center  justify-content-center">
              {filteredBlogs
                ?.slice(
                  (pageNo - 1) * perPage,
                  (pageNo - 1) * perPage + perPage <= filteredBlogs.length
                    ? (pageNo - 1) * perPage + perPage
                    : filteredBlogs.length
                )
                ?.map(blog => (
                  <div className="mb-3" style={{ maxWidth: 650 }}>
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div
                          style={{ height: 200, border: "1px solid #f7f7f7" }}
                        >
                          <img
                            src={`images/${blog.images[0].filename}`}
                            alt={`BLog Image`}
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-8">
                        <h5 className="text-dark world-tour__title">
                          {blog.title}{" "}
                          <span className="kt-font-sm text-muted">
                            - {moment(blog.createdAt).fromNow()}
                          </span>
                        </h5>
                        <div className="kt-font-sm text-muted">
                          Author: {blog.author?.firstName}{" "}
                          {blog.author?.lastName}
                        </div>
                        <div className="mt-3 blog-item__description">
                          {removeHTMLTags(blog.description)}
                        </div>
                        <Link
                          to={`/blogs/details/${blog._id}`}
                          className="btn btn-link"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          )}
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={filteredBlogs.length}
          />
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default Blogs;
