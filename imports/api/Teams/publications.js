import { Meteor } from "meteor/meteor";

import TeamsCollection from ".";

//
Meteor.publish("Teams", function () {
  // Test against User, Rules, ...
  // use this.propName
  // ex: return Collection.find({user: this.userId})
  return TeamsCollection.find({});
});
