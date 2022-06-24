import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import NotificationsSchema from "../Notification";

const EvaluatorCollection = new Mongo.Collection("evaluators");

EvaluatorCollection.schema = new SimpleSchema({
  seekersId: { type: Array, defaultValue: [], optional: true },
  "seekersId.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  notifications: {
    type: NotificationsSchema,
    defaultValue: {},
    optional: true,
  },
});

EvaluatorCollection.attachSchema(EvaluatorCollection.schema);

EvaluatorCollection.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },
});

export default EvaluatorCollection;
