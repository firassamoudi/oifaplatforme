import { Meteor } from "meteor/meteor";

import RoomCollection from ".";

Meteor.methods({
  "room.insert"({ seekerId, solverId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    const now = Date.now();
    RoomCollection.insert({
      updatedAt: now,
      members: [
        { _id: seekerId, lastSeen: now },
        { _id: solverId, lastSeen: now },
      ],
    });
  },
  "room.update.lastSeen"({ roomId }) {
    const userId = Meteor.userId();
    const user = Meteor.user();
    if (!userId || !user) return { message: "you can't" };
    const seekerId = user.seekerId;
    const solverId = user.solverId;
    const ownerId = seekerId || solverId;
    const now = Date.now();
    // ...
    const room = RoomCollection.findOne({ _id: roomId });
    room.members = room.members.map((member) => {
      if (member._id === ownerId) {
        return { ...member, lastSeen: now };
      }
      return member;
    });
    // ...
    RoomCollection.update({ _id: roomId }, { $set: { ...room } });
  },
});
