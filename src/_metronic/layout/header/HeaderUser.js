import React from "react";
import Topbar from "./Topbar";
import Brand from "../brand/Brand";

const HeaderUser = () => {
  return (
    <div
      className="kt-header kt-grid__item"
      style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000 }}
    >
      <div className="kt-header-menu-wrapper flex-grow-1">
        <div className="container d-flex align-items-center">
          <Brand />
        </div>
      </div>
      <Topbar />
    </div>
  );
};

export default HeaderUser;
