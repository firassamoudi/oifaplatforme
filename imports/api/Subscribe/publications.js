import { Meteor } from "meteor/meteor";

import SubscribeCollection from ".";

Meteor.publish("admin-subscribers", function () {
  const userId = this.userId;
  if (!userId) return this.ready();
  return SubscribeCollection.find();
});
