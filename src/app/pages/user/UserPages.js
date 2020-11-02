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
import WorldTour from "../admin/World-tour";
import WorldTourDetails from "../admin/WorldTourDetails";
import UmrahDeals from "../admin/UmrahDeals";
import UmrahDealsDetails from "../admin/UmrahDealsDetails";
import Blogs from "./Blogs";
import BlogsDetails from "./BlogsDetails";
import CreateBlog from "./CreateBlog";

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
                <MyTrips userType="user" />
              </KtContent>
            </UserLayout>
          )}
        />
        <Route
          path="/world-tour"
          component={() => (
            <UserLayout>
              <KtContent>
                <WorldTour />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/blogs"
          component={() => (
            <UserLayout>
              <KtContent>
                <Blogs />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/blogs/create"
          component={() => (
            <UserLayout>
              <KtContent>
                <CreateBlog edit={false} />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/blogs/edit/:blogId"
          component={() => (
            <UserLayout>
              <KtContent>
                <CreateBlog edit={true} />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/blogs/details/:blogId"
          component={() => (
            <UserLayout>
              <KtContent>
                <BlogsDetails />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/world-tour/details"
          component={() => (
            <UserLayout>
              <KtContent>
                <WorldTourDetails />
              </KtContent>
            </UserLayout>
          )}
        />
        <Route
          path="/umrah-deals"
          component={() => (
            <UserLayout>
              <KtContent>
                <UmrahDeals />
              </KtContent>
            </UserLayout>
          )}
          exact
        />
        <Route
          path="/umrah-deals/details"
          component={() => (
            <UserLayout>
              <KtContent>
                <UmrahDealsDetails />
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
