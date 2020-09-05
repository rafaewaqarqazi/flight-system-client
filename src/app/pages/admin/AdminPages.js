import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../Account";
import AdminRoute from "../../router/AdminRoute";
import Admins from "./Admins";
import CreateAdmin from "./CreateAdmin";
import MyTrips from "../user/MyTrips";
import WorldTour from "./World-tour";
import UmrahDeals from "./UmrahDeals";
import CreateWorldTour from "./CreateWorldTour";
import WorldTourDetails from "./WorldTourDetails";
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
        <AdminRoute path="/world-tour" component={WorldTour} exact />
        <AdminRoute path="/world-tour/details" component={WorldTourDetails} />
        <AdminRoute path="/world-tour/create" component={CreateWorldTour} />
        <AdminRoute path="/umrah-deals" component={UmrahDeals} />
        <AdminRoute path="/account" component={Account} exact />
        <AdminRoute path="/admins" component={Admins} exact />
        <AdminRoute path="/admins/new" component={CreateAdmin} exact />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
