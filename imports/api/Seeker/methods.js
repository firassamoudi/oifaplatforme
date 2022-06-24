import { throwError } from "../helpers";
import RoomCollection from "../Room";
import SeekerPlanCollection from "../SeekerPlan";
import SeekerCollection from ".";

Meteor.methods({
  "seeker.update"({ data }) {
    const userId = Meteor.userId();
    const user = Meteor.user();
    const seekerId = user.seekerId;
    if (!userId) {
      throw new Meteor.Error("seeker.update");
    }
    // ...
    SeekerCollection.update(seekerId, { $set: { ...data } });
    Meteor.users.update(userId, {
      $set: {
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        omborded: true,
      },
    });
  },
  "seeker.update.img"({ data }) {
    const userId = Meteor.userId();
    const user = Meteor.user();
    const seekerId = user.seekerId;
    if (!userId) {
      throw new Meteor.Error("seeker.update.img");
    }
    // ...
    SeekerCollection.update(seekerId, { $set: { imgId: data } });
  },
  "seeker.connect.solver"({ data }) {
    const userId = Meteor.userId();
    const user = Meteor.user();
    const seekerId = user.seekerId;
    if (!userId) {
      throw new Meteor.Error("seeker.connect.solver");
    }
    const seeker = SeekerCollection.findOne({ _id: seekerId });
    const canMakeConnexion = seeker.plan().canMakeConnexion();
    // ...
    if (!canMakeConnexion) {
      return throwError("plan-issues", "upgrade your plan");
    }
    // - Seeker
    SeekerCollection.update(
      { _id: seekerId },
      { $push: { solversId: data._id } }
    );
    // - SeekerPlan
    const planId = seeker.planId;
    SeekerPlanCollection.update(
      { _id: planId },
      { $inc: { connexionsCurrent: -1 } }
    );
    // - Create Room
    const now = Date.now();
    const roomId = RoomCollection.insert({
      updatedAt: now,
      members: [
        { _id: seekerId, lastSeen: now },
        { _id: data._id, lastSeen: now },
      ],
    });
    // ...
    return { roomId };
  },
});
