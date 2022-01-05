import React, { useEffect, useState } from "react";
import http from "../Common/RestAPIHandler";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const RestaurantFilter = ({ handleInputChange, filterValue }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    http.Get(
      `restaurants`,
      (data) => {
        setRestaurants(data);
      },
      () => {}
    );
  }, []);

  return (
    <form noValidate>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <TextField
            id="dateTime"
            label="Date Time"
            type="datetime-local"
            name="date_time"
            fullWidth
            value={filterValue.date_time}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Autocomplete
            id="searchRestaurantName"
            freeSolo
            fullWidth
            options={restaurants.map((option) => option.name)}
            renderInput={(params) => (
              <TextField {...params} label="Search Restaurant Name" />
            )}
            onChange={(e, v) => handleInputChange("restaurant_name", v)}
            onInputChange={(e) =>
              handleInputChange("restaurant_name", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RestaurantFilter;
