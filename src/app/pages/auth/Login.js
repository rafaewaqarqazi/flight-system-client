import React from "react";
import LoginLayout from "../../Components/layout/login/LoginLayout";
import "../../../_metronic/_assets/sass/pages/login/login-3.scss";
import LoginForm from "../../Components/users/LoginForm";

function Login({ isModal, handleLogin }) {
  return (
    <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
      <LoginLayout heading="Sign In" isModal={isModal}>
        <LoginForm isModal={isModal} handleLogin={handleLogin} />
      </LoginLayout>
    </div>
  );
}

export default Login;
