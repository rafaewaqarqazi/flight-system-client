/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const QuickActionsDropdownToggle = React.forwardRef((props, ref) => {
  return (
    <a
      ref={ref}
      href="#"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
      id=""
      className="btn btn-danger kt-subheader__btn-options"
    >
      Products
    </a>
  );
});

export class QuickActions extends React.Component {
  render() {
    return (
      <>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="quick-actions-tooltip">Quick actions</Tooltip>}
        >
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
              as={QuickActionsDropdownToggle}
              id="dropdown-toggle-quick-actions-subheader"
            />

            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">
                <i className="la la-plus"></i> New Product
              </a>
              <a className="dropdown-item" href="#">
                <i className="la la-user"></i> New Order
              </a>
              <a className="dropdown-item" href="#">
                <i className="la la-cloud-download"></i> New Download
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="la la-cog"></i> Settings
              </a>
            </Dropdown.Menu>
          </Dropdown>
        </OverlayTrigger>
      </>
    );
  }
}
