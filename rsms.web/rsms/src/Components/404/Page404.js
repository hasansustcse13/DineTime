import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Link } from "@material-ui/core";
import { RestaurantRoutePath } from "../Common/Constants/RouteConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    width: "95%",
    margin: "auto",
    marginTop: "10%",
    textAlign: "center",
  },
  color: {
    color: theme.colorScheme,
  },
  title: {
    fontSize: 100,
  },
  caption: {
    fontSize: 20,
    paddingBottom: 50,
  },
  link: {
    paddingTop: 50,
  },
}));

const Page404 = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.body}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            className={`${classes.color} ${classes.title}`}
          >
            404
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">OOPS! NOTHING WAS FOUND</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className={classes.caption}>
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className={classes.caption}>
            <Link
              className={`${classes.color} ${classes.link}`}
              href={`/${RestaurantRoutePath}`}
            >
              Return to homepage
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Page404;
