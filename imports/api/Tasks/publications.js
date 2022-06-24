import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import TasksCollection from ".";

Meteor.publish("Tasks", function (teamId) {
  check(teamId, String);
  // Test against User, Rules, ...
  // use this.propName
  // ex: return Collection.find({user: this.userId})
  return TasksCollection.find({ teamId });
});
