import React from "react";
import LayoutInitializer from "../../../../_metronic/layout/LayoutInitializer";
import MenuConfig from "../../../../_metronic/layout/MenuConfig";
import LayoutConfig from "../../../../_metronic/layout/LayoutConfig";
import HeaderMobile from "../../../../_metronic/layout/header/HeaderMobile";
import MainFooter from "../main/MainFooter";
import ScrollTop from "../../../partials/layout/ScrollTop";
import { withRouter } from "react-router-dom";
import HTMLClassService from "../../../../_metronic/layout/HTMLClassService";
import { useLayoutStyles } from "../../../../utils/material-styles/layoutStyles";
import HeaderUser from "../../../../_metronic/layout/header/HeaderUser";
const htmlClassService = new HTMLClassService();
const UserLayout = ({ children, layoutConfig, nobg }) => {
  const classes = useLayoutStyles();
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);
  const bg = !nobg
    ? {
        backgroundImage: "url(/media/bg/main.jpg)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }
    : {};
  return (
    <LayoutInitializer
      styles={[]}
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}
      <HeaderUser />
      <div
        className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed "
        style={{ background: "#f2f3f8", ...bg }}
      >
        {/* <!-- begin::Body --> */}
        <div className="d-flex kt-wrapper">
          {/*<Hidden xsDown>*/}
          {/*  <AsideLeftUser open={open} setOpen={setOpen}/>*/}
          {/*</Hidden>*/}
          {/*<div className={clsx(classes.appBar, {*/}
          {/*  [classes.appBarShift]: open,*/}
          {/*  [classes.appBarShiftLeft]: !open*/}
          {/*})}>*/}

          {/*</div>*/}

          <main className={classes.content}>
            <div>{children}</div>
          </main>
        </div>

        {/* <!-- end:: Body --> */}
      </div>
      <MainFooter />
      <ScrollTop />
    </LayoutInitializer>
  );
};

export default withRouter(UserLayout);
