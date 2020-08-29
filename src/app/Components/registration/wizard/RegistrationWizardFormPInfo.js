import React from "react";
import { Field } from "formik";
import RegistrationWizardContent from "./RegistrationWizardContent";
import { formErrorMessage } from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormPInfo = ({ errors }) => {
  return (
    <RegistrationWizardContent title="Setup Your Personal Information">
      <div className="form-group">
        <label>First Name*</label>
        {formErrorMessage(errors.firstName)}
        <Field
          className="form-control"
          name="firstName"
          placeholder="First Name"
          required
        />
        <span className="form-text text-muted">
          Please enter your First Name
        </span>
      </div>
      <div className="form-group">
        <label>Last Name*</label>
        {formErrorMessage(errors.lastName)}
        <Field
          className="form-control"
          name="lastName"
          placeholder="Last Name"
          required
        />
        <span className="form-text text-muted">
          Please enter your Last Name
        </span>
      </div>
      <div className="form-group">
        <label>Mobile No*</label>
        {formErrorMessage(errors.mobileNo)}
        <Field
          className="form-control"
          name="mobileNo"
          placeholder="03XXXXXXXXX"
          required
        />
        <span className="form-text text-muted">
          Please enter your Mobile Number
        </span>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormPInfo;
