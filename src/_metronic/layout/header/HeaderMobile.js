import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../../../app/partials/layout/UserProfile";
import {connect} from "react-redux";

class HeaderMobile extends React.Component {
  render() {
    const {isAuthorized} = this.props
    return (
      <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
        <div className="kt-header-mobile__logo">
          <Link to="/">
            <img alt="Logo" src="/media/logos/suits-logo.png" width={50}/>
          </Link>
        </div>
        <div className="kt-header-mobile__toolbar">
          <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left mr-2" >
            <span/>
          </button>
          {
            isAuthorized && <UserProfile/>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth}) => ({
  isAuthorized: auth.user != null
});

export default connect(mapStateToProps)(HeaderMobile);
