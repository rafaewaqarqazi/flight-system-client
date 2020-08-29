import React, { useState } from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import { withRouter } from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeftAdmin";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import "./assets/Base.scss";
import "../../_metronic/_assets/sass/global/layout/header/skins/base/light.scss";
import "../../_metronic/_assets/sass/global/layout/header/skins/menu/light.scss";
import "../../_metronic/_assets/sass/global/layout/brand/skins/dark.scss";
import "../../_metronic/_assets/sass/global/layout/aside/skins/dark.scss";
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
import { useLayoutStyles } from "../../utils/material-styles/layoutStyles";
import * as chat from "../../app/store/ducks/chat.duck";
const htmlClassService = new HTMLClassService();

function Layout({ children, layoutConfig }) {
  const classes = useLayoutStyles();
  const [open, setOpen] = useState(true);
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);

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

      <div
        className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed "
        style={{
          background: "#f2f3f8",
          backgroundImage: "url(/media/bg/bg-9.jpg)",
          backgroundSize: "100% 470px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* <!-- begin::Body --> */}
        <HeaderMobile />
        <div className="d-flex kt-wrapper">
          <Hidden xsDown>
            <AsideLeft open={open} setOpen={setOpen} />
          </Hidden>
          <div
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
              [classes.appBarShiftLeft]: !open
            })}
          >
            <Header />
          </div>

          <main className={clsx(classes.content, classes.contentShift)}>
            <div className="container-md">{children}</div>
          </main>
        </div>

        {/* <!-- end:: Body --> */}
      </div>
      <ScrollTop />
    </LayoutInitializer>
  );
}

const mapStateToProps = ({
  builder: { layoutConfig },
  auth: { user },
  chat
}) => ({
  user,
  chat,
  socket: chat.socket,
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display")
});

export default withRouter(connect(mapStateToProps, chat.actions)(Layout));
