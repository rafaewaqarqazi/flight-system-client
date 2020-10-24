export const editProfileValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required!";
  }

  if (!values.lastName) {
    errors.lastName = "Required!";
  }
  if (!values.mobileNo) {
    errors.mobileNo = "Required!";
  } else if (!values.mobileNo.match(/^[0-9]{11}$/)) {
    errors.mobileNo = "Invalid Mobile No!";
  }
  if (values.passportNo && !values.passportNo.match(/^[0-9]{9}$/)) {
    errors.passportNo = "Invalid Passport Number!";
  }
  if (!values.address) {
    errors.address = "Required!";
  }
  if (!values.country) {
    errors.country = "Required!";
  }

  return errors;
};
