export const jobPostValidations = (values) => {
  const errors = {};
  if (values.title.trim() === '') {
    errors.title = 'Title is Required!'
  }
  if (values.department.trim() === '') {
    errors.department = 'Department is Required!'
  }
  if (values.category.trim() === '') {
    errors.category = 'Category is required!';
  }
  if (values.type.trim() === '') {
    errors.type = 'Type is Required!';
  }
  if (values.description.trim() === '') {
    errors.description = 'Description is Required!'
  } else if (values.description.trim().length < 200) {
    errors.description = 'Description must be greater than 200 characters'
  }
  if (!values.dueDate) {
    errors.dueDate = 'Due Date is Required!'
  }
  if (!values.experience) {
    errors.experience = 'Experience is Required!'
  }
  if (!values.positions || values.positions === 0) {
    errors.positions = 'Positions is Required!'
  }
  if (values.qualifications.length === 0) {
    errors.qualifications = 'Qualifications is Required!'
  }
  return errors;
}