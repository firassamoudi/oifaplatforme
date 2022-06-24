import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { sidebarLinks } from "./config";

const AdminDashboard = ({ user, userId, Paper, stepIndex }) => {
  // ...
  return (
    <AdminDashboardLayout currTab={stepIndex} sidebarLinks={sidebarLinks}>
      <Paper user={user} />
    </AdminDashboardLayout>
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
})(AdminDashboard);
