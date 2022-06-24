import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { sidebarLinks } from "./config";

const SeekerDashboard = ({ user, userId, Paper, stepIndex }) => {
  useEffect(() => {
    // console.log("mount");
  }, []);
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
})(SeekerDashboard);
