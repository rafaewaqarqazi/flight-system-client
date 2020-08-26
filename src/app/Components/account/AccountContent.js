import React from 'react';
import ChangePassword from "./changePassword/ChangePassword";
import AccountPersonalInfo from "./personalInfo/AccountPersonalInfo";

const AccountContent = ({selected}) => {
  return (
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
      <div className="row">
        <div className="col-xl-12">
          {selected === 0 && <AccountPersonalInfo/>}
          {selected === 1 && <ChangePassword/>}
        </div>
      </div>
    </div>
  );
};

export default AccountContent;