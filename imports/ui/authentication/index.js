import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import routes from "./papers";

const Authentication = ({ user }) => (
  <>
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.id}
          exact
          path={route.path}
          render={() => <route.Component {...route.props} />}
        />
      ))}

      <Redirect to="/auth/login" />
    </Switch>
  </>
);

export default Authentication;
