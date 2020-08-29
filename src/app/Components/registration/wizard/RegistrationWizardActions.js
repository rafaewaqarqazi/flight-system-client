import React from "react";
import clsx from "clsx";
const RegistrationWizardActions = ({
  current,
  setCurrent,
  loadingButtonStyle,
  loading,
  validateForm
}) => {
  const handleNextStep = () => {
    validateForm().then(errors => {
      if (
        current === 0 &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.mobileNo
      ) {
        setCurrent(current + 1);
      } else if (
        current === 1 &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword
      ) {
        setCurrent(current + 1);
      } else if (current === 2 && !errors.address && !errors.country) {
        setCurrent(current + 1);
      }
      return errors;
    });
  };
  return (
    <div
      className={`kt-form__actions d-flex ${
        current === 0 ? "justify-content-end" : "justify-content-between"
      }`}
    >
      {current > 0 && (
        <button
          type="button"
          onClick={() => setCurrent(current - 1)}
          className="btn btn-secondary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u"
        >
          Previous
        </button>
      )}
      {current === 3 && (
        <button
          type="submit"
          className={`btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u ${clsx(
            {
              "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
            }
          )}`}
          style={loadingButtonStyle}
        >
          Register
        </button>
      )}
      {current !== 3 && (
        <button
          type="button"
          onClick={handleNextStep}
          className="btn btn-brand btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u float-right"
        >
          Next Step
        </button>
      )}
    </div>
  );
};

export default RegistrationWizardActions;
