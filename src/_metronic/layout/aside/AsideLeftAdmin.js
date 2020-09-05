import React from "react";
import { connect } from "react-redux";
import * as builder from "../../ducks/builder";
import { NavLink } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";
import AsideMain from "./AsideMain";

function AsideLeftAdmin({ open, setOpen }) {
  return (
    <AsideMain open={open} setOpen={setOpen}>
      <List className="kt-menu__nav ">
        <NavLink
          to="/dashboard"
          activeClassName="kt-menu__item--active"
          className="kt-menu__item"
        >
          <ListItem className="kt-menu__link w-100">
            <i className="kt-menu__link-icon fa fa-chart-bar" />
            <span className="kt-menu__link-text">Dashboard</span>
          </ListItem>
        </NavLink>
        <NavLink
          to="/flights"
          activeClassName="kt-menu__item--active"
          className="kt-menu__item"
        >
          <ListItem className="kt-menu__link w-100">
            <i className="kt-menu__link-icon fa fa-plane" />
            <span className="kt-menu__link-text">Flights</span>
          </ListItem>
        </NavLink>

        <NavLink
          to="/world-tour"
          activeClassName="kt-menu__item--active"
          className="kt-menu__item"
        >
          <ListItem className="kt-menu__link w-100">
            <i className="kt-menu__link-icon fa fa fa-plane" />
            <span className="kt-menu__link-text">World Tour</span>
          </ListItem>
        </NavLink>
        <NavLink
          to="/umrah-deals"
          activeClassName="kt-menu__item--active"
          className="kt-menu__item"
        >
          <ListItem className="kt-menu__link w-100">
            <i className="kt-menu__link-icon fa fa fa-plane" />
            <span className="kt-menu__link-text">Umrah Deals</span>
          </ListItem>
        </NavLink>
        <NavLink
          to="/admins"
          activeClassName="kt-menu__item--active"
          className="kt-menu__item"
        >
          <ListItem className="kt-menu__link w-100">
            <i className="kt-menu__link-icon fa fa-briefcase" />
            <span className="kt-menu__link-text">Admins</span>
          </ListItem>
        </NavLink>
      </List>
    </AsideMain>
  );
}

const mapStateToProps = store => ({
  disableAsideSelfDisplay:
    builder.selectors.getConfig(store, "aside.self.display") === false,
  asideClassesFromConfig: builder.selectors.getClasses(store, {
    path: "aside",
    toString: true
  }),
  menuCanvasOptions: {
    baseClass: "kt-aside",
    overlay: true,
    closeBy: "kt_aside_close_btn",
    toggleBy: {
      target: "kt_aside_mobile_toggler",
      state: "kt-header-mobile__toolbar-toggler--active"
    }
  }
});

export default connect(mapStateToProps)(AsideLeftAdmin);
