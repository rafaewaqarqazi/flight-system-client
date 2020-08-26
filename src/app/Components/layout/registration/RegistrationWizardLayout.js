import React from 'react';

const RegistrationWizardLayout = ({children, current}) => {
  return (
    <div className="kt-portlet">
      <div className="kt-portlet__body kt-portlet__body--fit">
        <div className="kt-grid kt-wizard-v3 kt-wizard-v3--white" id="kt_wizard_v3"
             data-ktwizard-state={current === 0 ? 'first' : current > 0 && current < 3 ? 'between' : 'last'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizardLayout;