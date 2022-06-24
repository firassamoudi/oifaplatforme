import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import routes from "./papers";

const Solver = ({ user, userId, loading }) => {
  // console.log("====Solver user :: ", user);
  // ...
  if (loading || !user) return null;
  return (
    <Switch>
      <Switch>
        {routes.map((route) => {
          // console.log("Solver dashboard :: ", route);
          // const hasRole = Roles.userIsInRole(userId, route.roles);
          // if (!hasRole) return null;
          // ...
          return (
            <Route
              key={route.id}
              exact
              path={route.path}
              render={() => <route.Component {...route.props} />}
            />
          );
        })}

        <Redirect to="/dashboard/programs" />
      </Switch>
    </Switch>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("_roles");
  const loading = !handle.ready();
  return { user, userId, loading };
})(Solver);
