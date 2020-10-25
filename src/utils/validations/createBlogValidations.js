export const createBlogValidations = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required!";
  }
  if (!values.description) {
    errors.description = "Required!";
  }
  if (values.images.length === 0) {
    errors.images = "Required!";
  }

  return errors;
};
