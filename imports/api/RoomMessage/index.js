import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";

const MessageCollection = new Mongo.Collection("messages");

MessageCollection.schema = new SimpleSchema({
  createdAt: { type: Date },
  content: { type: String, defaultValue: "", optional: true },
  files: { type: Array, defaultValue: [], optional: true },
  "files.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  roomId: { type: String, regEx: SimpleSchema.RegEx.Id },
});

MessageCollection.attachSchema(MessageCollection.schema);

MessageCollection.helpers({
  orgOwner() {
    const seeker = SeekerCollection.findOne({ _id: this.ownerId });
    const solver = SolverCollection.findOne({ _id: this.ownerId });
    return seeker || solver;
  },
});

export default MessageCollection;
