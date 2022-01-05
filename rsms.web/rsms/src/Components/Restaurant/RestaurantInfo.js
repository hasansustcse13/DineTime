import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
}));

const RestaurantInfo = ({ info }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Name: {info.restaurant_name}
        </Typography>
        <Typography color="textSecondary">Day: {info.day_of_week}</Typography>
        <Typography color="textSecondary">
          Open Time: {info.open_time}
        </Typography>
        <Typography color="textSecondary">
          Close Time: {info.close_time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
