import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import useStyles from "./Style";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  RestaurantRoutePath,
  FavoriteRestaurantRoutePath,
  RestaurantRouteName,
  FavoriteRestaurantRouteName,
} from "../Constants/RouteConstants";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import auth from "../../../services/authService";
import http from ".././RestAPIHandler";
import { clearUser } from "../../../redux-tools/actions/userActions";
import { connect } from "react-redux";

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const authorized = auth.isAuthorized(props.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loginButtonClick = () => {
    props.history.replace("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();

    http.Post(
      `authentication/logout/`,
      null,
      () => {
        auth.deleteToken();
        props.clearUser();
        props.history.replace(`${RestaurantRoutePath}`);
      },
      () => {}
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ display: "initial" }}>
              {props.title}
            </Typography>
          </div>
          <div>
            {!authorized ? (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                float="right"
                onClick={loginButtonClick}
              >
                Log-in
              </Button>
            ) : (
              <>
                <Chip
                  label={props.user.email}
                  aria-controls="profile-menu"
                  onClick={handleMenuOpen}
                  clickable
                />
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      width: 160,
                      borderRadius: 15,
                    },
                  }}
                >
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            onClick={handleDrawerClose}
            button
            component={Link}
            to={`/${RestaurantRoutePath}`}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={RestaurantRouteName} />
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem
            onClick={handleDrawerClose}
            button
            component={Link}
            to={`/${FavoriteRestaurantRoutePath}`}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={FavoriteRestaurantRouteName} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default connect(null, { clearUser })(Layout);
