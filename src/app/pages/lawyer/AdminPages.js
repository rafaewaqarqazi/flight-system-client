import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../Account";
import AdminRoute from "../../router/AdminRoute";
import Admins from "./Admins";
import CreateAdmin from "./CreateAdmin";
import MyTrips from "../user/MyTrips";
export default function AdminPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <AdminRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/flights" component={MyTrips} />
        <AdminRoute path="/account" component={Account} exact />
        <AdminRoute path="/admins" component={Admins} exact />
        <AdminRoute path="/admins/new" component={CreateAdmin} exact />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
