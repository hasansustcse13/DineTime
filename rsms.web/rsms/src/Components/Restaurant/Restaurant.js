import React, { useEffect, useState } from "react";
import http from "../Common/RestAPIHandler";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantInfo from "./RestaurantInfo";
import Grid from "@material-ui/core/Grid";
import { getCurrentDateTimeString } from "../Common/Utility";
import RestaurantFilter from "./RestaurantFilter";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Restaurant = (props) => {
  const classes = useStyles();

  const [restaurantInfos, setRestaurantInfos] = useState([]);
  const [filterValue, setFilterValue] = useState({
    date_time: getCurrentDateTimeString(),
    restaurant_name: "",
  });

  useEffect(() => {
    http.Get(
      `restaurant_infos?restaurant_name=${filterValue.restaurant_name}&date_time=${filterValue.date_time}`,
      (data) => {
        setRestaurantInfos(data);
      },
      () => {}
    );
  }, [filterValue]);

  const handleInputChange = (name, value) => {
    if (value === null || value === undefined) {
      value = "";
    }
    setFilterValue({
      ...filterValue,
      [name]: value,
    });
  };

  return (
    <div className={classes.root}>
      <RestaurantFilter
        handleInputChange={handleInputChange}
        filterValue={filterValue}
      ></RestaurantFilter>
      {restaurantInfos.length > 0 ? (
        <Grid container spacing={3}>
          {restaurantInfos.map((info) => (
            <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={info.id}>
              <RestaurantInfo info={info}></RestaurantInfo>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" component="h2" color="secondary">
          No Restaurant to Display
        </Typography>
      )}
    </div>
  );
};

export default Restaurant;
