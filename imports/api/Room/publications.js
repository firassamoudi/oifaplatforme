/* eslint-disable sonarjs/no-identical-functions */
import { Meteor } from "meteor/meteor";

import RoomMessageCollection from "../RoomMessage";
import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";
import RoomCollection from ".";

Meteor.publishComposite("user-notifs", function () {
  const userId = this.userId;
  const user = Meteor.user();
  if (!userId || !user) return this.ready();
  // ...
  const seekerId = user.seekerId;
  const solverId = user.solverId;
  // ...
  return {
    find() {
      if (seekerId) {
        return RoomCollection.find({
          members: { $elemMatch: { _id: { $eq: seekerId } } },
        });
      }
      if (solverId) {
        return RoomCollection.find({
          members: { $elemMatch: { _id: { $eq: solverId } } },
        });
      }
    },
  };
});

Meteor.publishComposite("messages-rooms", function () {
  const userId = this.userId;
  const user = Meteor.user();
  if (!userId || !user) return this.ready();
  // ...
  const seekerId = user.seekerId;
  const solverId = user.solverId;
  // ...
  return {
    find() {
      if (seekerId) {
        return RoomCollection.find({
          members: { $elemMatch: { _id: { $eq: seekerId } } },
        });
      }
      if (solverId) {
        return RoomCollection.find({
          members: { $elemMatch: { _id: { $eq: solverId } } },
        });
      }
    },
    children: [
      {
        find(room) {
          return RoomMessageCollection.find({ roomId: room._id });
        },
      },
      {
        find(room) {
          const _id = room.members[0]._id;
          return SeekerCollection.find({ _id });
        },
      },
      {
        find(room) {
          const _id = room.members[1]._id;
          return SolverCollection.find({ _id });
        },
      },
    ],
  };
});
