import Box from "@material-ui/core/Box";
import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";

const Profile = () => {
  return (
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
      </Switch>
    </>
  );
};

export default Profile;
