/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable camelcase */
import { Meteor } from "meteor/meteor";

import ApplicationsCollection from "/imports/api/Application";
// import ProgramsCollection from "/imports/api/Program";
import SeekersCollections from "/imports/api/Seeker";

export const notif82_84 = (program) => {
  const applications = ApplicationsCollection.find({
    programId: program._id,
    published: false,
  }).fetch();
  // ...
  const solversIds = applications.map((a) => a.solverId);
  // ...
  Meteor.call("notification.insert.solver.ids", {
    ids: [...solversIds],
    data: {
      createdAt: new Date(),
      data: {
        type: "solver_deadline_application",
        progName: program.title,
      },
    },
  });
  // ...
  // - Email 77
  Accounts.sendSolverFinishApplicationEmail({
    progTitle: program.title,
    solversIds,
  });
};

export const notif88_90 = (program) => {
  const seeker = SeekersCollections.findOne(program.seekerId);
  const seekerName = seeker.getOrgName();
  // ...
  const appAccepted = ApplicationsCollection.find({
    programId: program._id,
    published: true,
    evaluated: true,
    accepted: true,
  }).fetch();
  const acceptedSolversIds = appAccepted.map((a) => a.solverId);
  // ...
  const appNAccepted = ApplicationsCollection.find({
    programId: program._id,
    published: true,
    evaluated: true,
    accepted: false,
  }).fetch();
  const nacceptedSolversIds = appNAccepted.map((a) => a.solverId);
  // ...
  Meteor.call("notification.insert.solver.ids", {
    ids: [...nacceptedSolversIds],
    data: {
      createdAt: new Date(),
      data: {
        type: "solver_application_declined",
        progName: program.title,
      },
    },
  });
  // - Email 89
  Accounts.sendSolverProgramGoNoEmail({
    progId: program._id,
    progTitle: program.title,
    seekerName,
    solversIds: [...nacceptedSolversIds],
  });
  // ...
  Meteor.call("notification.insert.solver.ids", {
    ids: [...acceptedSolversIds],
    data: {
      createdAt: new Date(),
      data: {
        type: "solver_application_accepted",
        progName: program.title,
      },
    },
  });
  // - Email 91
  Accounts.sendSolverProgramGoEmail({
    progId: program._id,
    progTitle: program.title,
    seekerName,
    solversIds: [...acceptedSolversIds],
  });
};

export const notif98 = (program) => {
  const evaluatorsId = program.evaluatorsId;
  // ...
  Meteor.call("notification.insert.evaluator.ids", {
    ids: [...evaluatorsId],
    data: {
      createdAt: new Date(),
      data: {
        type: "evaluator_deadline",
        progName: program.title,
      },
    },
  });
  // Email 99
  Accounts.sendEvaluatorProgramDeadlineEmail({
    progTitle: program.title,
    evaluatorIds: evaluatorsId,
  });
};

export const notif102 = (program) => {
  const seekerId = program.seekerId;
  // ...
  Meteor.call("notification.insert.seeker", {
    seekerId,
    data: {
      createdAt: new Date(),
      data: {
        type: "program_applications_end",
        progName: program.title,
        progId: program._id,
      },
    },
  });
};

export const notif103 = (program) => {
  const seekerId = program.seekerId;
  // ...
  Meteor.call("notification.insert.seeker", {
    seekerId,
    data: {
      createdAt: new Date(),
      data: {
        type: "program_evaluations_end",
        progName: program.title,
        progId: program._id,
      },
    },
  });
};

export const notif104 = (program) => {
  const seekerId = program.seekerId;
  // ...
  Meteor.call("notification.insert.seeker", {
    seekerId,
    data: {
      createdAt: new Date(),
      data: {
        type: "program_selection_end",
        progName: program.title,
        progId: program._id,
      },
    },
  });
};

export const notif106 = (program) => {
  const seekerId = program.seekerId;
  const seeker = SeekersCollections.findOne(seekerId);
  const ownerId = seeker.ownerId;
  const user = Meteor.users.findOne(ownerId);
  const email = user.emails[0].address;
  // ...
  Meteor.call("notification.insert.seeker", {
    seekerId,
    data: {
      createdAt: new Date(),
      data: {
        type: "program_applications_check",
        progName: program.title,
        progId: program._id,
      },
    },
  });
  // ...
  Accounts.sendApplicationsClosedEmail({
    to: email,
    seekerId,
    progId: program._id,
    progTitle: program.title,
  });
};
