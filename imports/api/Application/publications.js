import { Meteor } from "meteor/meteor";

import ApplicationCollection from ".";

Meteor.publish("applications", function ({ solverId }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  return ApplicationCollection.find({ solverId });
});
