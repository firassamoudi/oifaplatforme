import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import RoomMessageCollection from "../RoomMessage";
import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";

const RoomCollection = new Mongo.Collection("rooms");

const leID = (user) => {
  const seekerId = user.seekerId;
  const solverId = user.solverId;
  return seekerId || solverId;
};
const leMe = (_id, members) => {
  const data = members.filter((member) => member._id === _id);
  return data[0];
};
const leOther = (_id, members) => {
  const data = members.filter((member) => member._id !== _id);
  return data[0];
};

RoomCollection.schema = new SimpleSchema({
  updatedAt: { type: Date },
  members: { type: Array },
  "members.$": { type: Object },
  "members.$.lastSeen": { type: Date },
  "members.$._id": { type: String, regEx: SimpleSchema.RegEx.Id },
});

RoomCollection.attachSchema(RoomCollection.schema);

RoomCollection.helpers({
  theOther() {
    const user = Meteor.user();
    const memberId = leID(user);
    const other = leOther(memberId, this.members);
    const otherId = other._id;
    const seeker = SeekerCollection.findOne({ _id: otherId });
    const solver = SolverCollection.findOne({ _id: otherId });
    return seeker || solver;
  },
  isUpdated() {
    const user = Meteor.user();
    const memberId = leID(user);
    const me = leMe(memberId, this.members);
    return this.updatedAt > me.lastSeen;
  },
  lastMessage() {
    return RoomMessageCollection.findOne(
      { roomId: this._id },
      { sort: { createdAt: -1 } }
    );
  },
});

export default RoomCollection;
