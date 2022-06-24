import { Meteor } from "meteor/meteor";

import ApplicationCollection from "../Application";
import SeekerCollection from "../Seeker";
import SolverCollection from ".";

Meteor.publish("solver-profile", function ({ solverId }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  // if User is Seeker
  // seekerId = user.seekerId
  // seeker
  // const connected = seeker.isConnected({solverId})
  // publishConfig === { connected }
  return [Meteor.users.find({ solverId }), SolverCollection.find(solverId)];
});

Meteor.publishComposite("solvers", function () {
  const userId = this.userId;
  if (!userId) return this.ready();

  return {
    find() {
      return SolverCollection.find({});
    },
    children: [
      {
        find(solver) {
          return Meteor.users.find({ _id: solver.ownerId });
        },
      },
    ],
  };
});

Meteor.publishComposite("seeker.search.solvers", function ({ data }) {
  const userId = this.userId;
  // const user = Meteor.user();
  if (!userId) return this.ready();
  // const seeker = SeekerCollection.find({ _id: user.seekerId });
  // console.log(seeker);
  // ...
  let baseQuery = { type: { $eq: data.type } };
  if (data.country) {
    baseQuery = { ...baseQuery, country: { $eq: data.country } };
  }
  const query = { $and: [baseQuery] };
  // ...
  if (data.maturityLevel?.length) {
    query.$and.push({ $or: [{ maturityLevel: { $in: data.maturityLevel } }] });
  }
  if (data.sector?.length) {
    query.$and.push({
      $or: [{ sector: { $elemMatch: { value: { $in: data.sector } } } }],
    });
  }
  if (data.capabilities?.length) {
    query.$and.push({
      $or: [
        {
          capabilities: { $elemMatch: { value: { $in: data.capabilities } } },
        },
      ],
    });
  }
  // ...
  return {
    find() {
      // return SolverCollection.find(query, { fields: { country: 0 } });
      return SolverCollection.find(query);
    },
    children: [
      {
        find(solver) {
          return Meteor.users.find({ _id: solver.ownerId });
        },
      },
    ],
  };
});

Meteor.publishComposite("admin-solvers-stats", function () {
  const userId = this.userId;
  if (!userId) return this.ready();

  return {
    find() {
      return SolverCollection.find({});
    },
    children: [
      {
        find(solver) {
          return ApplicationCollection.find();
        },
      },
    ],
  };
});
