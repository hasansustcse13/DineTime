import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import http from "../Common/RestAPIHandler";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
  selectedColor: {
    backgroundColor: "#FFA500",
  },
}));

const RestaurantInfo = ({ info, collections, refreshCollectionsData }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (collection) => {
    handleMenuClose();

    const alreadyAdded = collection.restaurants.some(
      (r) => r.id === info.restaurant_id
    );

    if (alreadyAdded === false) {
      http.Post(
        `collection/restaurants/`,
        {
          restaurant: info.restaurant_id,
          collection: collection.id,
        },
        () => {
          refreshCollectionsData();
        },
        () => {}
      );
    } else {
      http.Delete(
        `collection/restaurants/`,
        {
          restaurant: info.restaurant_id,
          collection: collection.id,
        },
        () => {
          refreshCollectionsData();
        },
        () => {}
      );
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          action={
            collections.length > 0 && (
              <Tooltip title="Add/Remove Collections">
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            )
          }
          title={info.restaurant_name}
        />
        <CardContent>
          <Typography color="textSecondary">Day: {info.day_of_week}</Typography>
          <Typography color="textSecondary">
            Open Time: {info.open_time}
          </Typography>
          <Typography color="textSecondary">
            Close Time: {info.close_time}
          </Typography>
        </CardContent>
      </Card>

      {collections.length > 0 && (
        <Menu
          id={info.id}
          anchorEl={anchorEl}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
        >
          {collections.map((collection) => (
            <div key={collection.id}>
              <MenuItem
                className={
                  collection.restaurants.some(
                    (r) => r.id === info.restaurant_id
                  )
                    ? classes.selectedColor
                    : ""
                }
                onClick={() => handleMenuItemClick(collection)}
              >
                {collection.name}
              </MenuItem>
              <Divider />
            </div>
          ))}
        </Menu>
      )}
    </>
  );
};

export default RestaurantInfo;
