import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = (props) => {
  const [open, setOpen] = React.useState(props.open);
  const primaryMessage = props.primaryMessage;
  const secondaryMessage = props.secondaryMessage;

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={props.onDisagree}
      >
        <DialogTitle id="alert-dialog-title">{primaryMessage}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {secondaryMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <React.Fragment>
            <Button
              onClick={props.onDisagree}
              variant="outlined"
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={props.onAgree}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Yes
            </Button>
          </React.Fragment>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
