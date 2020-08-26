import React from 'react';
import {Alert} from "reactstrap";

const AlertSuccess = ({show, message, handleClose}) => {
  return (
    <Alert className='alert-solid-success' isOpen={show} >
      <div className="alert-icon">
        <i className="fa fa-check" />
      </div>
      <div className='alert-text'>
        {message}
      </div>
      <div className="alert-close">
        <button
          type="button"
          className="close"
          onClick={handleClose}
        >
          <span aria-hidden="true">
            <i className="la la-close" />
          </span>
        </button>
      </div>
    </Alert>
  );
};

export default AlertSuccess;