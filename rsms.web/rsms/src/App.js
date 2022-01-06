import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Page from "./Components/Common/Page";
import Restaurant from "./Components/Restaurant/Restaurant";
import FavoriteRestaurant from "./Components/FavoriteRestaurant/FavoriteRestaurant";
import {
  RestaurantRoutePath,
  FavoriteRestaurantRoutePath,
} from "./Components/Common/Constants/RouteConstants";

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

      <Redirect exact from="/" to={`/${RestaurantRoutePath}`} />
    </Switch>
  );
};

export default App;
