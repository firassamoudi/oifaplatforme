import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import ProgramsCollection from "../Program";
import SeekerCollection from "../Seeker";
import TeamCollection from "../Team";

const WorkplaceCollection = new Mongo.Collection("workplaces");

WorkplaceCollection.schema = new SimpleSchema({
  published: { type: Boolean, defaultValue: false, optional: true },
  // ...
  seekerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  programId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

WorkplaceCollection.attachSchema(WorkplaceCollection.schema);

WorkplaceCollection.helpers({
  seeker() {
    return SeekerCollection.findOne({ _id: this.seekerId });
  },
  program() {
    return ProgramsCollection.findOne({ _id: this.programId });
  },
  teams() {
    return TeamCollection.findOne({ workplaceId: this._id });
  },
});

export default WorkplaceCollection;
