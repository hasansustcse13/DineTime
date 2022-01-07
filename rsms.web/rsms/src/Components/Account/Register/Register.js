import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useStyles from "../Style";
import http from "../../Common/RestAPIHandler";

const Register = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [formError, setFormError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    http.Post(
      `register/`,
      user,
      () => {
        props.history.replace("/login");
      },
      (status, error) => {
        if (status === 400) {
          setFormError(error);
        }
      }
    );
  };

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setFormError({
      ...formError,
      [e.target.name]: [],
    });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          className={classes.container}
        >
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-first-name-input"
                  label="First Name"
                  type="text"
                  name="first_name"
                  variant="outlined"
                  fullWidth
                  value={user.first_name || ""}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-last-name-input"
                  label="Last Name"
                  type="text"
                  name="last_name"
                  variant="outlined"
                  fullWidth
                  value={user.last_name || ""}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-email-input"
                  label="E-mail"
                  type="text"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={user.email || ""}
                  onChange={onInputChange}
                  error={formError?.email?.length > 0}
                  helperText={
                    formError?.email?.length > 0 && formError.email[0]
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  style={{
                    fontWeight: "bold",
                  }}
                  value={user.password || ""}
                  onChange={onInputChange}
                  inputProps={{
                    style: { fontWeight: "bold" },
                  }}
                  error={formError?.password?.length > 0}
                  helperText={
                    formError?.password?.length > 0 && formError.password[0]
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6} className={classes.rightElement}>
                    <Button type="submit" variant="outlined" color="secondary">
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
