import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Workplace from "..";

export default [
  {
    id: "WorkPlace",
    path: "/dashboard/workplace",
    Component: Workplace,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SOLVER_OWNER"],
    props: {},
  },
  {
    id: "WorkPlace",
    path: "/dashboard/workplace/:teamId",
    Component: Workplace,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SOLVER_OWNER"],
    props: {},
  },
];

export const workPlaceRoutes = () => (
  <Switch>
    <Route exact path="/dashbord/workplace" component={WorkPlace} />
    <Route exact path="/dashbord/workplace/:teamId" component={WorkPlace} />
    <Redirect to="/dashbord/workplace" />
  </Switch>
);
