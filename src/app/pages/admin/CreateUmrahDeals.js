import React, {useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import AlertSuccess from "../../Components/alerts/AlertSuccess";
import AlertError from "../../Components/alerts/AlertError";

const CreateUmrahDeals = () => {
  const [response, setResponse] = useState({
    success: {
      show: false,
      message: ""
    },
    error: {
      show: false,
      message: ""
    }
  });
  const closeAlert = () => {
    setResponse({
      success: {
        show: false,
        message: ""
      },
      error: {
        show: false,
        message: ""
      }
    });
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Create Umrah Deals"

        />
        <PortletBody>
          <AlertSuccess
            show={response.success.show}
            message={response.success.message}
            handleClose={closeAlert}
          />
          <AlertError
            show={response.error.show}
            message={response.error.message}
            handleClose={closeAlert}
          />

        </PortletBody>
      </Portlet>
    </div>
  );
};

export default CreateUmrahDeals;
