import React from 'react';

const AccountContentHeader = ({title, subtitle}) => {
  return (
    <div className="kt-portlet__head">
      <div className="kt-portlet__head-label">
        <h3 className="kt-portlet__head-title">
          {title}<small>{subtitle}</small>
        </h3>
      </div>
    </div>
  );
};

export default AccountContentHeader;