import "./style.scss";

import Box from "@material-ui/core/Box";
import MuiSnackbar from "@material-ui/core/Snackbar";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect } from "react";

import store from "/imports/libs/store";

const Snackbar = ({ message }) => {
  // ...
  useEffect(() => {
    enqueueSnackbar(message);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    store.set("snackbar", null);
  };
  // ...
  return (
    <MuiSnackbar
      className="Snackbar"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={!!message}
      autoHideDuration={5000}
      onClose={handleClose}
      message={<Box className="Snackbar__message">{message}</Box>}
    />
  );
};

const SnackbarT = withTracker(() => {
  const user = Meteor.user();
  const message = store.get("snackbar");
  return { user, message };
})(Snackbar);

export default SnackbarT;
