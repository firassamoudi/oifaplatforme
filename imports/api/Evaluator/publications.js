import { Meteor } from "meteor/meteor";

import EvaluatorCollection from ".";

Meteor.publishComposite(null, function () {
  const userId = this.userId;
  if (!userId) return this.ready();
  const user = Meteor.user();
  const seekerId = user.seekerId;
  if (!seekerId) return this.ready();
  // ...
  return {
    find() {
      return EvaluatorCollection.find({ seekersId: { $eq: seekerId } });
    },
    children: [
      {
        find(evaluator) {
          return Meteor.users.find({ _id: evaluator.ownerId });
        },
      },
      {
        find(evaluator) {
          return Meteor.roleAssignment.find({ "user._id": evaluator.ownerId });
        },
      },
    ],
  };
});
