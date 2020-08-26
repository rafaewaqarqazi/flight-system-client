export const adminCreateValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required!'
  }

  if (!values.lastName) {
    errors.lastName = 'Required!'
  }
  if (!values.email) {
    errors.email = 'Required!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid Email!'
  }
  if (!values.mobileNo) {
    errors.mobileNo = 'Required!'
  } else if (!values.mobileNo.match(/^[0-9]{11}$/)) {
    errors.mobileNo = 'Invalid Mobile No!'
  }
  if (!values.address) {
    errors.address = 'Required!'
  }
  if (!values.country) {
    errors.country = 'Required!'
  }

  return errors;
}