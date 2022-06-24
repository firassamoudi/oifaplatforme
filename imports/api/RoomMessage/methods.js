import { Meteor } from "meteor/meteor";

import RoomCollection from "../Room";
import MessageCollection from ".";

Meteor.methods({
  "message.insert"({ roomId, content, files }) {
    const userId = Meteor.userId();
    const user = Meteor.user();
    if (!userId || !user) return { message: "you can't" };
    const seekerId = user.seekerId;
    const solverId = user.solverId;
    const ownerId = seekerId || solverId;
    const now = new Date();
    // - Insert Message
    MessageCollection.insert({
      createdAt: now,
      ownerId,
      roomId,
      content,
      files,
    });
    // - Update Room
    const room = RoomCollection.findOne({ _id: roomId });
    room.updatedAt = now;
    room.members = room.members.map((member) => {
      if (member._id === ownerId) {
        return { ...member, lastSeen: now };
      }
      return member;
    });
    RoomCollection.update({ _id: roomId }, { $set: { ...room } });
  },
});
