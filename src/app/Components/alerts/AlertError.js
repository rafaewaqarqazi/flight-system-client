import React from 'react';
import {Alert} from "reactstrap";

const AlertError = ({show, message, handleClose}) => {
  return (
    <Alert className='alert-solid-danger' isOpen={show} >
      <div className="alert-icon">
        <i className="fa fa-exclamation-triangle" />
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

export default AlertError;