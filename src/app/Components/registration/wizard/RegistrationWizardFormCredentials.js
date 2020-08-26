import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
const RegistrationWizardFormCredentials = ({errors}) => {
  return (
    <RegistrationWizardContent title='Add Credentials'>
      <div className="form-group">
        <label>Email address*</label>
        {formErrorMessage(errors.email)}
        <Field className="form-control" name="email" placeholder="someone@somthing.com"/>
      </div>
      <div className="form-group">
        <label>Password*</label>
        {formErrorMessage(errors.password)}
        <Field className="form-control" type='password' name="password" placeholder="********"/>
        <span className="form-text text-muted">
          Password must be a minimum 8 characters with at least one capital letter and one number
        </span>
      </div>
      <div className="form-group">
        <label>Confirm Password*</label>
        {formErrorMessage(errors.confirmPassword)}
        <Field className="form-control" type='password' name="confirmPassword" placeholder="********"/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormCredentials;