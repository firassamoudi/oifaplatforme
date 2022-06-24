import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import DashboardLayout from "../../layouts/SolverDashboardLayout";
import { sidebarLinks } from "./config";

const SeekerDashboard = ({ user, Paper, stepIndex }) => {
  return (
    <DashboardLayout currTab={stepIndex} sidebarLinks={sidebarLinks}>
      <Paper user={user} />
    </DashboardLayout>
  );
};

export default withTracker(({ Paper, stepIndex }) => {
  const user = Meteor.user();
  // ...
  return {
    user,
    Paper,
    stepIndex,
  };
})(SeekerDashboard);
