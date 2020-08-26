import React from 'react';

const RegistrationWizardContent = ({children, title}) => {
  return (
    <div className="kt-wizard-v3__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
      <div className="kt-heading kt-heading--md">{title}</div>
      <div className="kt-form__section kt-form__section--first">
        <div className="kt-wizard-v3__form">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizardContent;