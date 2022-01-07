import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
  container: {
    minHeight: "100vh",
  },
  rightElement: {
    textAlign: "right",
  },
  error: {
    color: "red",
  },
}));
export default useStyles;
