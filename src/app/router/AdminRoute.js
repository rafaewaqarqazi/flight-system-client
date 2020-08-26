import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const AdminRoute = ({path, component: Component, ...rest}) => {
  const { isAdmin } = useSelector(
    ({ auth }) => ({
      isAdmin: auth.user && auth.user.role === '2'
    }),
    shallowEqual
  );
  return (
    <Route {...rest} render={props => (
      isAdmin ? <Component {...props}/> : <Redirect to="/auth/login" />
    )}/>
  )

};

export default AdminRoute;