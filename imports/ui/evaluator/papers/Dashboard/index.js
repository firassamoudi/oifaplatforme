import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { sidebarLinks } from "./config";

const EvaluatorDashboard = ({ user, Paper, stepIndex }) => {
  // ...
  return (
    <DashboardLayout currTab={stepIndex} sidebarLinks={sidebarLinks}>
      <Paper user={user} />
    </DashboardLayout>
  );
};

export default withTracker(({ Paper, stepIndex }) => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  return {
    user,
    userId,
    Paper,
    stepIndex,
  };
})(EvaluatorDashboard);
