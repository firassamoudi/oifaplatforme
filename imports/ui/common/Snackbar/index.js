import "./style.scss";

import { withTracker } from "meteor/react-meteor-data";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect } from "react";

import store from "/imports/libs/store";

const Snackbar = ({ snackbar }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // ...
  useEffect(() => {
    if (snackbar.msg) {
      enqueueSnackbar(snackbar.msg, {
        key: snackbar.key,
        preventDuplicate: true,
        persist: snackbar.persist,
        variant: snackbar.variant,
        autoHideDuration: snackbar.autoHideDuration || 5000,
      });
    }
    // - Close others
    if (snackbar.close) {
      snackbar.close.split(",").forEach((key) => {
        closeSnackbar(key);
      });
    }
    // - Reset
    store.set("snackbar", {});
  }, [snackbar]);

  return null;
};

const IntegrationNotistack = ({ snackbar }) => (
  <SnackbarProvider
    preventDuplicate
    maxSnack={4}
    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
  >
    <Snackbar id={snackbar.msg} key={snackbar.msg} snackbar={snackbar} />
  </SnackbarProvider>
);

const SnackbarT = withTracker(() => {
  const user = Meteor.user();
  const snackbar = store.get("snackbar");
  // ...
  return { user, snackbar };
})(IntegrationNotistack);

export default SnackbarT;
