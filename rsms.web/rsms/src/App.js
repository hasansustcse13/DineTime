import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Page from "./Components/Common/Page";
import Restaurant from "./Components/Restaurant/Restaurant";
import FavouriteRestaurant from "./Components/FavouriteRestaurant/FavouriteRestaurant";
import {
  RestaurantRoutePath,
  FavouriteRestaurantRoutePath,
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
        path={`/${FavouriteRestaurantRoutePath}`}
        exact
        render={(props) => (
          <Page
            title={"My Restaurant Collections"}
            {...props}
            component={FavouriteRestaurant}
          />
        )}
      />

      <Redirect exact from="/" to={`/${RestaurantRoutePath}`} />
    </Switch>
  );
};

export default App;
