/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbs(props) {
  const { items } = props;
  if (!items || !items.length) {
      return "";
  }

  const length = items.length;
  return (
    <div className="kt-subheader__breadcrumbs">
      <a href="#" className="kt-subheader__breadcrumbs-home">
        <i className="flaticon2-shelter" />
      </a>
      <span className="kt-subheader__breadcrumbs-separator" />
      {items.map((item, index) => (
        <React.Fragment key={`bc${index}`}>
          <Link className="kt-subheader__breadcrumbs-link" to={`/${item.page}`}>
            {item.title}
          </Link>
          {length !== index + 1 && (
            <span className="kt-subheader__breadcrumbs-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BreadCrumbs;
