import React, { Fragment } from "react";
import UserProfile from "../../../app/partials/layout/UserProfile";
import { shallowEqual, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <div className="kt-header__topbar kt-grid__item">
      {isAuthorized ? (
        <UserProfile />
      ) : (
        <div className="d-flex align-items-center">
          <NavLink to="/auth/login" className="btn btn-outline-success ml-3">
            Login or Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default Topbar;
