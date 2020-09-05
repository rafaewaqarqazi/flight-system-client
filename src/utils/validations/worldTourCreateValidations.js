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
  } else if (values.packagePrice > 999999) {
    errors.packagePrice = "Price should not exceed Rs 999,999!";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Required!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Required!";
  }

  return errors;
};
