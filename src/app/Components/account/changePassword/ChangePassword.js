import React from "react";
import AccountContentHeader from "../AccountContentHeader";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='Change Password' subtitle='change or reset your account password'/>
      <ChangePasswordForm/>
    </div>
  );
};

export default ChangePassword;
