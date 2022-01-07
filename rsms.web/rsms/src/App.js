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

const App = (props) => {
  return (
    <Switch>
      <Route
        path={`/${RestaurantRoutePath}`}
        exact
        render={(props) => (
          <Page title={"All Restaurants"} {...props} component={Restaurant} />
        )}
      />

      <Route
        path={`/${FavoriteRestaurantRoutePath}`}
        exact
        render={(props) => (
          <Page
            title={"My Restaurant Collections"}
            {...props}
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
    </Switch>
  );
};

export default App;
