import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const UserRoute = ({path, component: Component, ...rest}) => {
  const { isUser } = useSelector(
    ({ auth }) => ({
      isUser: auth.user && auth.user.role === '1'
    }),
    shallowEqual
  );
  return (
    <Route {...rest} render={props => (
      isUser ? <Component {...props}/> : <Redirect to="/auth/login" />
    )}/>
  )

};

export default UserRoute;