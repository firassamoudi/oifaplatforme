import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import SolverCollection from "/imports/api/Solver";

import { settingsTabs } from "./config";
import SettingsLayout from "./layout";

const Settings = ({ userId, solver }) => {
  const tabs = settingsTabs?.filter((tab) => {
    // - Solvers
    if (tab.solverRole && solver) {
      const solverType = solver?.type ?? "";
      return tab.solverRole === solverType;
    }
    // - Other
    if (!tab.roles) return true;
    return Roles.userIsInRole(userId, [...tab.roles]);
  });
  // ...
  return <SettingsLayout settingsTabs={tabs} />;
};

export default withTracker(() => {
  const userId = Meteor.userId();
  const user = Meteor.user();
  // ...
  let solver = null;
  if (user) {
    const solverId = user?.solverId;
    solver = SolverCollection.findOne({ _id: solverId });
  }
  return { userId, solver };
})(Settings);
