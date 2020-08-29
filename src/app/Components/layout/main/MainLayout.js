import React from "react";
import MainFooter from "./MainFooter";

const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: "url(/media/bg/main.jpg)",
        backgroundPosition: "center top",
        backgroundSize: "100%",
        height: "350px"
      }}
    >
      <div className="kt-page--loading-enabled kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header--minimize-menu kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent">
        <div className="kt-grid kt-grid--hor kt-grid--root">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
            <div
              className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
              id="kt_wrapper"
            >
              <div className="kt-container">{children}</div>
              <MainFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
