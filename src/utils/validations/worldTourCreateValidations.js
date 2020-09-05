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
    errors.packagePrice =
      "Price should not exceed Rs 999,999! (with development key)";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Required!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Required!";
  }

  return errors;
};
export const umrahDealsCreateValidations = values => {
  const errors = {};

  if (!values.packageTitle) {
    errors.packageTitle = "Required!";
  }
  if (!values.numberOfPeople) {
    errors.numberOfPeople = "Required!";
  }
  if (!values.numberOfDays) {
    errors.numberOfDays = "Required!";
  }
  if (!values.packagePrice) {
    errors.packagePrice = "Required!";
  } else if (values.packagePrice > 999999) {
    errors.packagePrice =
      "Price should not exceed Rs 999,999! (with development key)";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Required!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Required!";
  }

  return errors;
};
