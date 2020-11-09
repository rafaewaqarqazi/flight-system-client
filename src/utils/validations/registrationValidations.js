export const validateRegistration = (values, current) => {
  const errors = {};
  const firstNameArray = Array.from(values.firstName);
  const lastNameArray = Array.from(values.lastName);
  const addressArray = Array.from(values.address);
  let firstNameValid = true;
  let lastNameValid = true;
  let addressValid = true;
  firstNameArray.map((ch, i) => {
    if (i + 2 < firstNameArray.length) {
      if (ch === firstNameArray[i + 1] && ch === firstNameArray[i + 2]) {
        firstNameValid = false;
      }
    }
  });
  lastNameArray.map((ch, i) => {
    if (i + 2 < lastNameArray.length) {
      if (ch === lastNameArray[i + 1] && ch === lastNameArray[i + 2]) {
        lastNameValid = false;
      }
    }
  });
  addressArray.map((ch, i) => {
    if (i + 2 < addressArray.length) {
      if (ch === addressArray[i + 1] && ch === addressArray[i + 2]) {
        addressValid = false;
      }
    }
  });
  if (current === 0 && values.firstName.trim() === "") {
    errors.firstName = "First Name is Required!";
  } else if (current === 0 && !firstNameValid) {
    errors.firstName = "Invalid Name!";
  }
  if (current === 0 && values.lastName.trim() === "") {
    errors.lastName = "Last Name is Required!";
  } else if (current === 0 && !lastNameValid) {
    errors.lastName = "Invalid Name!";
  }
  if (current === 0 && values.mobileNo.trim() === "") {
    errors.mobileNo = "Mobile No is Required!";
  } else if (current === 0 && !values.mobileNo.match(/^[0-9]{11}$/)) {
    errors.mobileNo = "Invalid Mobile No!";
  }
  if (current === 1 && values.email.trim() === "") {
    errors.email = "Email is required!";
  } else if (
    current === 1 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid Email!";
  }

  if (current === 1 && values.password.trim() === "") {
    errors.password = "Password is Required!";
  } else if (
    current === 1 &&
    !values.password.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ) {
    errors.password = "Invalid Password";
  }
  if (current === 1 && !values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is Required!";
  } else if (current === 1 && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password Does not Match";
  }
  if (current === 2 && !values.address) {
    errors.address = "Address is Required!";
  } else if (current === 2 && !addressValid) {
    errors.address = "Invalid Address!";
  }
  if (current === 2 && !values.country) {
    errors.country = "Country is Required!";
  }
  if (current === 3 && !values.agree) {
    errors.agree = "Please Agree to our privacy and service policy";
  }
  return errors;
};
