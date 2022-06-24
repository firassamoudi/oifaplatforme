import { Meteor } from "meteor/meteor";

import ApplicationCollection from "../Application";
import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";
import TeamCollection from "../Team";
import WorkplaceCollection from "../Workplace";
import ProgramCollection from ".";
//
// Both
//

Meteor.publishComposite("program-overview", function ({ progId }) {
  const userId = this.userId;
  if (!userId || !progId) return this.ready();
  // return [
  //   ProgramCollection.find({ _id: progId }),
  //   ApplicationCollection.find({ ownerId: userId }),
  //   SolverCollection.find({ ownerId: userId }),
  // ];
  return {
    find() {
      return ProgramCollection.find({ _id: progId });
    },
    children: [
      {
        find(program) {
          return SeekerCollection.find({ _id: program.seekerId });
        },
      },
      {
        find() {
          return ApplicationCollection.find({ ownerId: userId });
        },
      },
      {
        find() {
          return SolverCollection.find({ ownerId: userId });
        },
      },
    ],
  };
});

//
// Seeker
//

Meteor.publish("program", function ({ progId }) {
  const userId = this.userId;
  if (!userId || !progId) return this.ready();
  const user = Meteor.user();
  const seekerId = user.seekerId;
  return ProgramCollection.find({ _id: progId, seekerId });
});

Meteor.publish("program-solver-apply", function ({ progId, appId }) {
  const userId = this.userId;
  if (!userId || !progId) return this.ready();
  const user = Meteor.user();
  const solverId = user.solverId;
  if (!solverId) return this.ready();
  return [
    ProgramCollection.find({ _id: progId }),
    ApplicationCollection.find({ _id: appId }),
  ];
});

Meteor.publishComposite("programs", function ({ isCFA }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  const user = Meteor.user();
  const seekerId = user.seekerId;
  return {
    find() {
      return ProgramCollection.find({ seekerId, isCFA });
    },
    children: [
      {
        find(program) {
          return WorkplaceCollection.find({ _id: program.workplaceId });
        },
      },
      {
        find(program) {
          return ApplicationCollection.find({ programId: program._id });
        },
        children: [
          {
            find(application) {
              const solverId = application.solverId;
              return SolverCollection.find(solverId);
            },
          },
        ],
      },
    ],
  };
});

//
// Evaluator
//

Meteor.publishComposite("programs-evaluator", function () {
  const userId = this.userId;
  if (!userId) return this.ready();
  const user = Meteor.user();
  const evaluatorId = user.evaluatorId;
  // ...
  return {
    find() {
      return ProgramCollection.find({
        evaluatorsId: { $elemMatch: { $eq: evaluatorId } },
      });
    },
    children: [
      {
        find(program) {
          return SeekerCollection.find({ _id: program.seekerId });
        },
      },
      {
        find(program) {
          return ApplicationCollection.find({ programId: program._id });
        },
        children: [
          {
            find(application) {
              const solverId = application.solverId;
              return SolverCollection.find(solverId);
            },
          },
        ],
      },
    ],
  };
});

Meteor.publishComposite("program-applications", function ({ programId }) {
  const userId = this.userId;
  if (!userId || !programId) return this.ready();
  return {
    find() {
      return ProgramCollection.find({ _id: programId });
    },
    children: [
      {
        find(program) {
          return WorkplaceCollection.find({ programId: program._id });
        },
      },
      {
        find(program) {
          return ApplicationCollection.find({ programId: program._id });
        },
        children: [
          {
            find(application) {
              const solverId = application.solverId;
              return SolverCollection.find(solverId);
            },
          },
        ],
      },
    ],
  };
});

Meteor.publishComposite("program-application", function ({
  programId,
  applicationId,
}) {
  const userId = this.userId;
  if (!userId || !programId || !applicationId) return this.ready();
  // ...
  return {
    find() {
      return ProgramCollection.find({ _id: programId });
    },
    children: [
      {
        find(program) {
          return ApplicationCollection.find({
            _id: applicationId,
            programId: program._id,
          });
        },
        children: [
          {
            find(application) {
              const solverId = application.solverId;
              return SolverCollection.find(solverId);
            },
            children: [
              {
                find(solver) {
                  return Meteor.users.find({ _id: solver.ownerId });
                },
              },
            ],
          },
        ],
      },
    ],
  };
});

//
// Solver
//

Meteor.publishComposite("programs-solver", function () {
  const userId = this.userId;
  if (!userId) return this.ready();
  return {
    find() {
      return ApplicationCollection.find({ ownerId: userId });
    },
    children: [
      {
        find(application) {
          return ProgramCollection.find({
            _id: application.programId,
          });
        },
        children: [
          {
            find(program) {
              return WorkplaceCollection.find({
                programId: program._id,
              });
            },
            children: [
              {
                find(workplace) {
                  return TeamCollection.find({ workplaceId: workplace._id });
                },
              },
            ],
          },
        ],
      },
    ],
  };
});

Meteor.publishComposite("programs-solver-search", function ({ data }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  // ...
  const isCFA = data.type === "CFA";
  let baseQuery = { published: true, accepted: true, isCFA };
  if (data.geoScope?.label && data.geoScope?.value) {
    baseQuery = { ...baseQuery, geographicalScope: { $in: [data.geoScope] } };
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
      return ProgramCollection.find(query);
    },
    children: [
      {
        find(program) {
          return SeekerCollection.find({ _id: program.seekerId });
        },
      },
    ],
  };
});

Meteor.publishComposite("admin-programs", function () {
  const userId = this.userId;
  if (!userId) return this.ready();
  // ...
  // return ProgramCollection.find({ published: true });
  return {
    find() {
      return ProgramCollection.find({ published: true });
    },
    children: [
      {
        find(program) {
          return WorkplaceCollection.find({ _id: program.workplaceId });
        },
      },
      {
        find(program) {
          return ApplicationCollection.find({ programId: program._id });
        },
      },
    ],
  };
});
