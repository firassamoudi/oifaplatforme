import { Meteor } from "meteor/meteor";

import ProgramCollection from "../Program";
import SeekerPlan from "../SeekerPlan";
import SeekerCollection from ".";

Meteor.publishComposite("seeker-profile", function ({ seekerId }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  // ...
  return {
    find() {
      return SeekerCollection.find(seekerId);
    },
    children: [
      {
        find(seeker) {
          return Meteor.users.find({ _id: seeker.ownerId });
        },
      },
      {
        find(seeker) {
          return SeekerPlan.find({ _id: seeker.planId });
        },
      },
      {
        find(seeker) {
          return ProgramCollection.find({
            seekerId: seeker._id,
            published: true,
          });
        },
      },
    ],
  };
});

Meteor.publishComposite("admin-seekers", function () {
  const userId = this.userId;
  if (!userId) return this.ready();

  return {
    find() {
      return SeekerCollection.find({});
    },
    children: [
      {
        find(seeker) {
          return ProgramCollection.find({ seekerId: seeker._id });
        },
      },
      {
        find(seeker) {
          return SeekerPlan.find({ _id: seeker.planId });
        },
      },
      {
        find(seeker) {
          return Meteor.users.find({ _id: seeker.ownerId });
        },
      },
    ],
  };
});

Meteor.publishComposite("admin-seekers-stats", function () {
  const userId = this.userId;
  if (!userId) return this.ready();

  return {
    find() {
      return SeekerCollection.find({});
    },
    children: [
      {
        find(seeker) {
          return ProgramCollection.find({ seekerId: seeker._id });
        },
      },
    ],
  };
});
