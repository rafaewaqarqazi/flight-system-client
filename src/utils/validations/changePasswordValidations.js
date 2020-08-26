export const changePasswordValidations = values => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = 'Required!'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required!'
  } else if (!values.newPassword.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    errors.newPassword = 'Invalid Password!'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required!'
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Password Does not Match!'
  }

  return errors;
}