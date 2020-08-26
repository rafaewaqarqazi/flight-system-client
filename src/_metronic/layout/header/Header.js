import React from "react";
import Topbar from "./Topbar";
function Header({fixed}) {
  return (
    <div className="kt-header kt-grid__item" style={fixed ? {position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000} : {}}>
      <div className="kt-header-menu-wrapper" />
      <Topbar />
    </div>
  );
}

export default Header;
