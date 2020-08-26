import React from 'react';
import {Link, useHistory} from "react-router-dom";

const FaQsSubHeader = () => {
  const history = useHistory();
  return (
    <div className="kt-subheader kt-grid__item" id="kt_subheader">
      <div className="kt-container ">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">
            FAQ 1 </h3>
          <div className="kt-subheader__breadcrumbs">
            <Link to="/" className="kt-subheader__breadcrumbs-home">
              <i className="flaticon2-shelter"/>
            </Link>
            <span className="kt-subheader__breadcrumbs-separator"/>
            <Link to="/" className="kt-subheader__breadcrumbs-link">
              Home
            </Link>
            <span className="kt-subheader__breadcrumbs-separator"/>
            <Link to="/faqs" className="kt-subheader__breadcrumbs-link">
              FAQs
            </Link>
          </div>
        </div>
        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper">
            <button onChange={() => history.goBack()} className="btn btn-danger btn-lg btn-font-sm">
              <i className='fa fa-arrow-left'/>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FaQsSubHeader;