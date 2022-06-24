/**
 * Petit Connectivity
 */

import store from "./store";

export default (connection) => {
  const status = connection.status;
  if (status === "connected") {
    store.set("snackbar", {
      // key: "server-connected",
      // variant: "info",
      // msg: "Connection resotored",
      close: "server-waiting",
    });
  }

  if (status === "waiting") {
    store.set("snackbar", {
      key: "server-waiting",
      variant: "error",
      msg: "You are currently offline",
      persist: true,
    });
  }
};
