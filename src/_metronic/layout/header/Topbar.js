import React, {Fragment} from "react";
import UserProfile from "../../../app/partials/layout/UserProfile";
import {shallowEqual, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Topbar = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <div className="kt-header__topbar kt-grid__item">

      {
        isAuthorized ? <UserProfile/> :
          <div className='d-flex align-items-center'>
            <NavLink to="/auth/login" className="btn btn-success btn-sm ml-3">Login</NavLink>
            <NavLink to="/auth/registration" className="btn btn-primary btn-sm ml-3 mr-5">Sign Up</NavLink>
          </div>
      }

    </div>
  );
}
export default Topbar
