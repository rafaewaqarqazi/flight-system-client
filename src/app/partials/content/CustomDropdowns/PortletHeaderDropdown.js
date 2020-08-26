/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const PortletHeaderDropdownToggle = React.forwardRef((props, ref) => {
    return (
      <button
          ref={ref}
        id="kt_dashboard_daterangepicker"
        type="button"
        onClick={e => {
          e.preventDefault();
          props.onClick(e);
        }}
        className="btn btn-clean btn-sm btn-icon btn-icon-lg"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="flaticon-more-1"></i>
      </button>
    );

});

export default class PortletHeaderDropdown extends React.Component {
  render() {
    return (
      <Dropdown className="kt-portlet__head-toolbar" drop="down" alignRight>
        <Dropdown.Toggle
          as={PortletHeaderDropdownToggle}
          id="dropdown-toggle-top"
        >
          <i className="flaticon-more-1" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right">
          <ul className="kt-nav">
            <li className="kt-nav__section kt-nav__section--first">
              <span className="kt-nav__section-text">Finance</span>
            </li>
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link">
                <i className="kt-nav__link-icon flaticon2-graph-1"></i>
                <span className="kt-nav__link-text">Statistics</span>
              </a>
            </li>
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link">
                <i className="kt-nav__link-icon flaticon2-calendar-4"></i>
                <span className="kt-nav__link-text">Events</span>
              </a>
            </li>
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link">
                <i className="kt-nav__link-icon flaticon2-layers-1"></i>
                <span className="kt-nav__link-text">Reports</span>
              </a>
            </li>
            <li className="kt-nav__section">
              <span className="kt-nav__section-text">Customers</span>
            </li>
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link">
                <i className="kt-nav__link-icon flaticon2-calendar-4"></i>
                <span className="kt-nav__link-text">Notifications</span>
              </a>
            </li>
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link">
                <i className="kt-nav__link-icon flaticon2-file-1"></i>
                <span className="kt-nav__link-text">Files</span>
              </a>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
