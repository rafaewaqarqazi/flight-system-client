import React from "react";
import { Link } from "react-router-dom";

const LoginLayout = ({ children, heading, isModal }) => {
  return (
    <div
      className="kt-login__body"
      style={{
        backgroundImage: "url(/media/bg/bg-3.jpg)",
        height: isModal ? "auto" : "100vh"
      }}
    >
      <div className="kt-login__form">
        <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
          <div
            className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin"
            id="kt_login"
          >
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
              <div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                <div className="kt-login__container">
                  {!isModal && (
                    <Link to="/" className="btn btn-label">
                      {" "}
                      <i className="fa fa-arrow-left" /> Back
                    </Link>
                  )}

                  <div className="kt-login__logo m-0">
                    <img src="/media/logos/logo.png" alt="Logo" width="200" />
                  </div>
                  <div className="kt-login__signin">
                    <div className="kt-login__head">
                      <h3 className="kt-login__title">{heading}</h3>
                    </div>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
