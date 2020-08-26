import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../Account";
import Cases from "./cases/cases";
import AdminRoute from "../../router/AdminRoute";
import Admins from "./Admins";
import CreateAdmin from "./CreateAdmin";
import Clients from "./clients/clients";
import ChatPage from "../ChatPage";
import CaseDetails from "./cases/CaseDetails";
export default function AdminPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <AdminRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/cases" component={Cases} exact/>
        <AdminRoute path="/cases/details/:caseId" component={CaseDetails} exact/>
        <AdminRoute path="/clients/:clientId" component={Clients} exact/>
        <AdminRoute path="/clients" component={Clients} exact/>
        <AdminRoute path="/account" component={Account} exact/>
        <AdminRoute path="/admins" component={Admins} exact/>
        <AdminRoute path="/admins/new" component={CreateAdmin} exact/>
        <AdminRoute path="/chat" component={ChatPage} exact/>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
