import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../../_metronic";
import { Redirect, Route, Switch } from "react-router-dom";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";
import Home from "../Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import UserLayout from "../../Components/layout/user/UserLayout";
import { shallowEqual, useSelector } from "react-redux";
import KtContent from "../../../_metronic/layout/KtContent";
import MyTrips from "./MyTrips";

const UserPages = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route path="/" component={Home} exact />
        {!isAuthorized && <Route path="/auth/login" component={Login} exact />}
        {!isAuthorized && (
          <Route path="/auth/registration" component={Registration} exact />
        )}
        <UserRoute
          path="/my-trips"
          component={() => (
            <UserLayout>
              <KtContent>
                <MyTrips userType="client" />
              </KtContent>
            </UserLayout>
          )}
        />
        <UserRoute
          path="/account"
          component={() => (
            <UserLayout>
              <KtContent>
                <Account />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;
