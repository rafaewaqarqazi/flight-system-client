import React from 'react';
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import InputCountry from "../../input/InputCountry";
const RegistrationWirzardFormAddress = ({errors}) => {

  return (
    <RegistrationWizardContent title="Enter Your Location">
      <div className="form-group">
        <label>Address*</label>
        {formErrorMessage(errors.address)}
        <Field className="form-control" name="address" placeholder="Address" required/>
        <span className="form-text text-muted">Please enter your address</span>
      </div>
      <div className="form-group">
        <label>Country*</label>
        {formErrorMessage(errors.country)}
        <InputCountry/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWirzardFormAddress;