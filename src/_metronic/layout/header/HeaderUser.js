import React from "react";
import Topbar from "./Topbar";
import Brand from "../brand/Brand";
import { shallowEqual, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const HeaderUser = () => {
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user
    }),
    shallowEqual
  );
  return (
    <div
      className="kt-header kt-grid__item"
      style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000 }}
    >
      <div className="kt-header-menu-wrapper flex-grow-1">
        <div className="container d-flex align-items-center">
          <Brand />
          {isAuthorized && user.role === "1" && (
            <NavLink
              to="/my-trips"
              activeClassName={"active"}
              className="zzzzzzz ml-5"
            >
              My Trips
            </NavLink>
          )}
          <NavLink
            to="/world-tour"
            activeClassName={"active"}
            className="zzzzzzz ml-2"
          >
            World Tour
          </NavLink>
          <NavLink
            to="/umrah-deals"
            activeClassName={"active"}
            className="zzzzzzz ml-2"
          >
            Umrah Deals
          </NavLink>
          <NavLink
            to="/blogs"
            activeClassName={"active"}
            className="zzzzzzz ml-2"
          >
            Blogs
          </NavLink>
        </div>
      </div>
      <Topbar />
    </div>
  );
};

export default HeaderUser;
