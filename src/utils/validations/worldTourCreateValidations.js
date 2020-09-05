export const worldTourCreateValidations = values => {
  const errors = {};

  if (!values.country) {
    errors.country = "Required!";
  }

  if (!values.packageTitle) {
    errors.packageTitle = "Required!";
  }
  if (!values.packagePrice) {
    errors.packagePrice = "Required!";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Required!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Required!";
  }

  return errors;
};
