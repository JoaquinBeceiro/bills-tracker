import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CustomDialog = props => {
  const { open, handleOk, handleCancel, title, description } = props;

  return (
    <Dialog
      open={open}
      onClose={handleCancel && handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleOk && (
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        )}
        {handleCancel && (
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
