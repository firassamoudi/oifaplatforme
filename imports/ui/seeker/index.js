import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import routes from "./papers";

const Seeker = ({ user, userId, loading }) => {
  if (loading || !user) return null;
  // ...
  return (
    <Switch>
      {routes.map((route) => {
        const hasRole = Roles.userIsInRole(userId, route.roles);
        if (!hasRole) return null;
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

      <Redirect
        to={
          user.omborded
            ? "/dashboard/programs"
            : "/dashboard/ombording/create-profile"
        }
      />
    </Switch>
  );
};

const SeekerT = withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("_roles");
  const loading = !handle.ready();
  return { user, userId, loading };
})(Seeker);

export default SeekerT;
