import { Meteor } from "meteor/meteor";

import ProgramsCollection from "../Program";
import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";
import ApplicationCollection from ".";

Meteor.methods({
  "application.insert"({ progId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    const user = Meteor.user();
    const solverId = user.solverId;
    const solver = SolverCollection.findOne(solverId);
    const program = ProgramsCollection.findOne(progId) ?? { challenges: [] };
    const challenges = [...program.challenges]
      .filter((ch) => ch.selected)
      .map((chl) => ({
        ...chl,
        picked: false,
      }));
    // ...
    const data = {
      accepted: false,
      ownerId: userId,
      solverId,
      programId: progId,
      // ...
      organization: solver.organization,
      websiteLink: solver.websiteLink,
      foundedDate: solver.foundedDate,
      firstName: solver.firstName,
      lastName: solver.lastName,
      jobPosition: solver.jobPosition,
      phoneNumber: solver.phoneNumber,
      country: solver.country,
      city: solver.city,
      email: user.emails[0]?.address,
      // ...
      solution: { challenges },
      // ...
      founders: solver.founders,
      members: solver.members,
      // ...
      hearAboutUs: "",
      hearAboutUsOther: "",
      // ...
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // ...
    const appId = ApplicationCollection.insert({ ...data });
    return { appId };
  },
  "application.update"({ id, data }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // Remove Errors params
    const solution = {};
    Object.keys(data.solution).forEach((key) => {
      if (!key.endsWith("Error")) {
        solution[key] = data.solution[key];
      }
    });
    // ...
    ApplicationCollection.update(id, {
      $set: {
        organization: data.organization,
        websiteLink: data.websiteLink,
        foundedDate: data.foundedDate,
        // ...
        firstName: data.firstName,
        lastName: data.lastName,
        // ...
        country: data.country,
        city: data.city,
        jobPosition: data.jobPosition,
        email: data.email,
        phoneNumber: data.phoneNumber,
        // - Solution
        solution,
        // - Startup team
        founders: [...data.founders],
        members: [...data.members],
        // hearAboutUs
        hearAboutUs: data.hearAboutUs,
        hearAboutUsOther: data.hearAboutUsOther,
        // ...
        updatedAt: new Date(),
      },
    });
  },
  // ...
  "application.publish"({ data }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    ApplicationCollection.update(
      { _id: data._id },
      { $set: { published: true, updatedAt: new Date() } }
    );
    this.unblock();
    // ...
    const user = Meteor.user();
    const solverId = user.solverId;
    // - Notif 82
    Meteor.call("notification.insert.solver", {
      solverId,
      data: {
        createdAt: new Date(),
        data: {
          type: "solver_finish_application",
        },
      },
    });
  },
  "application.evaluation.add"({ appId, programId, solverId, data }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // - Data
    const evaluation = {
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      feedback: data.feedback,
      ownerId: userId,
      criteria: data.criteria,
    };
    // ...
    ApplicationCollection.update(
      {
        _id: appId,
        programId,
        solverId,
      },
      { $push: { evaluations: evaluation } }
    );
    this.unblock();
    // ...
    const program = ProgramsCollection.findOne({ _id: programId });
    const seeker = SeekerCollection.findOne({ _id: program.seekerId });
    const evaluator = Meteor.users.findOne({ _id: userId });
    // - Notif 108
    Meteor.call("notification.insert.seeker", {
      seekerId: seeker._id,
      data: {
        createdAt: new Date(),
        data: {
          type: "evaluator_new_evaluation",
          progId: programId,
          appId,
          evaluatorName: evaluator.profile.firstName,
          evaluatorId: evaluator._id,
        },
      },
    });
  },
  "application.accepted"({ appId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    ApplicationCollection.update(
      { _id: appId },
      { $set: { accepted: true, evaluated: true, updatedAt: new Date() } }
    );
  },
  "application.declined"({ appId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    ApplicationCollection.update(
      { _id: appId },
      { $set: { accepted: false, evaluated: true, updatedAt: new Date() } }
    );
  },
  "application.dropped"({ appId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    ApplicationCollection.update(
      { _id: appId },
      { $set: { dropped: true, updatedAt: new Date() } }
    );
  },
  "application.droppedBack"({ appId }) {
    const userId = Meteor.userId();
    if (!userId) return { message: "you can't" };
    // ...
    ApplicationCollection.update(
      { _id: appId },
      { $set: { dropped: false, updatedAt: new Date() } }
    );
  },
});
