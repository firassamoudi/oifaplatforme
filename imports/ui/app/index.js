import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import connectivity from "/imports/libs/connectivity";
import AdminDashboard from "/imports/ui/admin";
import Authentication from "/imports/ui/authentication/";
import AuthenticationEmailValidation from "/imports/ui/authentication/papers/EmailValidation";
import Snackbar from "/imports/ui/common/Snackbar";
import EvaluatorDashboard from "/imports/ui/evaluator";
import Messages from "/imports/ui/messages";
import Profile from "/imports/ui/profile";
import SeekerDashboard from "/imports/ui/seeker";
import Settings from "/imports/ui/settings";
import SolverDashboard from "/imports/ui/solver";
import Workplace from "/imports/ui/workplace";

import Poute from "./components/Poute";
import { adminRoles, evaluatorRoles, seekerRoles, solverRoles } from "./config";

const App = ({ userId, connection }) => {
  useEffect(() => connectivity(connection), [connection.status]);
  const isSeeker = Roles.userIsInRole(userId, [...seekerRoles]);
  const isEvaluator = Roles.userIsInRole(userId, [...evaluatorRoles]);
  const isSolver = Roles.userIsInRole(userId, [...solverRoles]);
  const isAdmin = Roles.userIsInRole(userId, [...adminRoles]);
  // - Dashboard
  const Dashboard =
    (isSeeker && SeekerDashboard) ||
    (isEvaluator && EvaluatorDashboard) ||
    (isSolver && SolverDashboard) ||
    (isAdmin && AdminDashboard);
  // ...
  return (
    <>
      <CssBaseline />
      <Snackbar />

      <Switch>
        <Poute
          path="/dashboard/i"
          asIf={userId}
          or="/auth"
          component={Profile}
        />

        <Poute
          path="/dashboard/messages/:id"
          asIf={userId}
          or="/auth"
          component={Messages}
        />

        <Poute
          path="/dashboard/messages"
          asIf={userId}
          or="/auth"
          component={Messages}
        />

        <Poute
          path="/dashboard/workplace/:workplaceId/:teamId"
          asIf={userId}
          or="/auth"
          component={Workplace}
        />

        <Poute
          path="/dashboard/workplace/:workplaceId"
          asIf={userId}
          or="/auth"
          component={Workplace}
        />

        <Poute
          path="/dashboard/settings"
          asIf={userId}
          or="/auth"
          component={Settings}
        />

        <Poute
          path="/dashboard"
          asIf={userId}
          or="/auth"
          component={Dashboard}
        />

        <Route
          path="/auth/register/email-validation/:token"
          component={AuthenticationEmailValidation}
        />

        <Poute
          path="/auth"
          asIf={!userId}
          or="/dashboard"
          component={Authentication}
        />

        <Redirect to="/auth" />
      </Switch>
    </>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const connection = Meteor.status();
  return { user, userId, connection };
})(App);
