import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Page from "./Components/Common/Page";
import Restaurant from "./Components/Restaurant/Restaurant";
import FavoriteRestaurant from "./Components/FavoriteRestaurant/FavoriteRestaurant";
import {
  RestaurantRoutePath,
  FavoriteRestaurantRoutePath,
} from "./Components/Common/Constants/RouteConstants";
import Login from "./Components/Account/Login/Login";
import Register from "./Components/Account/Register/Register";
import { connect } from "react-redux";
import Page404 from "./Components/404/Page404";

const App = (appProps) => {
  return (
    <Switch>
      <Route
        path={`/${RestaurantRoutePath}`}
        exact
        render={(props) => {
          return (
            <Page
              title={"All Restaurants"}
              {...props}
              {...appProps}
              component={Restaurant}
            />
          );
        }}
      />

      <Route
        path={`/${FavoriteRestaurantRoutePath}`}
        exact
        render={(props) => (
          <Page
            title={"My Restaurant Collections"}
            authenticationRequired={true}
            {...props}
            {...appProps}
            component={FavoriteRestaurant}
          />
        )}
      />

      <Route path="/login" exact render={(props) => <Login {...props} />} />

      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />

      <Redirect exact from="/" to={`/${RestaurantRoutePath}`} />

      <Route path="/404" exact render={(props) => <Page404 {...props} />} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {})(App);
