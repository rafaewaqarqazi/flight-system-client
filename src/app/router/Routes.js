/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/AdminPages`).
 */

import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import AdminPages from "../pages/admin/AdminPages";
import ErrorsPage from "../pages/errors/ErrorsPage";
import LogoutPage from "../pages/auth/Logout";
import { LayoutContextProvider } from "../../_metronic";
import Layout from "../../_metronic/layout/Layout";
import * as routerHelpers from "../router/RouterHelpers";
import ForgotPassword from "../pages/auth/ForgotPassword";
import UserPages from "../pages/user/UserPages";
import ResetPassword from "../pages/auth/ResetPassword";

export const Routes = withRouter(({ history }) => {
    const lastLocation = useLastLocation();
    routerHelpers.saveLastLocation(lastLocation);
    const { isAdmin, menuConfig, userLastLocation } = useSelector(
        ({ auth, builder: { menuConfig } }) => ({
            menuConfig,
            isUser: auth.user && auth.user.role === '1',
            isAdmin: auth.user && auth.user.role === '2',
            isAuthorized: auth.user != null,
            userLastLocation: routerHelpers.getLastLocation()
        }),
        shallowEqual
    );

    return (
        /* Create `LayoutContext` from current `history` and `menuConfig`. */
        <LayoutContextProvider history={history} menuConfig={menuConfig}>
            <Switch>
              <Route path="/auth/forgot-password" component={ForgotPassword}/>
              <Route path="/auth/reset-password/:token" component={ResetPassword}/>
              <Route path="/logout" component={LogoutPage} />
                { isAdmin ? (
                  <Layout >
                    <AdminPages userLastLocation={userLastLocation} />
                  </Layout>
                ) : <UserPages userLastLocation={userLastLocation} />
                }
                <Route path="/error" component={ErrorsPage} />

            </Switch>
        </LayoutContextProvider>
    );
});
