import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";

// ...
import history from "/imports/libs/history";
import App from "/imports/ui/app";

Meteor.startup(() => {
  // console.log("~~~ App startup ~~~");
  // ...
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById("app-root")
  );
});
