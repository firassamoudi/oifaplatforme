import { Meteor } from "meteor/meteor";

import ApplicationCollection from "../Application";
import { ifYouAre, throwError } from "../helpers";
import SeekerCollection from "../Seeker";
import SeekerPlanCollection from "../SeekerPlan";
import TeamCollection from "../Team";
import WorkplaceCollection from "../Workplace";
import ProgramCollection from ".";
import {
  challenges,
  criteria,
  faq,
  // ...
  questionsOthers,
  questionsOthersCFA,
  questionsStartup,
  questionsStartupCFA,
  timeline,
} from "./props";

Meteor.methods({
  "program.insert"({ isCFA = false }) {
    ifYouAre(["SEEKER_OWNER", "SEEKER_CREATOR"]);
    // ...
    const user = Meteor.user();
    const seekerId = user.seekerId;
    // - ifSeekerCanAddProgram
    const seeker = SeekerCollection.findOne({ _id: seekerId });
    const canAddProgram = seeker.plan().canAddProgram();
    if (!canAddProgram) {
      return throwError("plan-issues", "upgrade your plan");
    }
    // - Create Program
    const workplaceId = WorkplaceCollection.insert({ seekerId });
    const programId = ProgramCollection.insert({
      seekerId,
      workplaceId,
      faq,
      challenges,
      isCFA,
      // ...
      timeline,
      // ...
      criteria,
      // ...
      questionsStartup: isCFA ? questionsStartupCFA : questionsStartup,
      questionsDesigner: isCFA ? questionsOthersCFA : questionsOthers,
      questionsDeveloper: isCFA ? questionsOthersCFA : questionsOthers,
      questionsResearcher: isCFA ? questionsOthersCFA : questionsOthers,
      questionsStudent: isCFA ? questionsOthersCFA : questionsOthers,
      // ...
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // - Update Workplace-Program
    WorkplaceCollection.update({ _id: workplaceId }, { $set: { programId } });
    // - SeekerPlan
    const planId = seeker.planId;
    SeekerPlanCollection.update(
      { _id: planId },
      { $inc: { programsCurrent: -1 } }
    );
    // ...
    return programId;
  },
  "program.update"({ id, data }) {
    ifYouAre(["SEEKER_OWNER", "SEEKER_CREATOR"]);
    // ...
    const program = ProgramCollection.findOne({ _id: id });
    const seeker = SeekerCollection.findOne({ _id: program.seekerId });
    const ownerId = seeker.ownerId;
    const lastUpdatedAt = program.updatedAt;
    const updatedAt = new Date();
    const canAlert = updatedAt - lastUpdatedAt > 999 * 60 * 5;
    // ...
    ProgramCollection.update(id, {
      $set: {
        title: data.title,
        sector: data.sector,
        context: data.context,
        contextVideo: data.contextVideo,
        // ...
        imgId: data.imgId,
        // ...
        incentive: data.incentive,
        // ...
        copyright: data.copyright,
        // ...
        timeline: data.timeline,
        // ...
        faq: data.faq,
        // ...
        targetAudience: data.targetAudience,
        geographicalScope: data.geographicalScope,
        maturityLevel: data.maturityLevel,
        capabilities: data.capabilities,
        criteria: data.criteria,
        // ...
        challenges: data.challenges,
        // ...
        questionsStartup: data.questionsStartup,
        questionsDesigner: data.questionsDesigner,
        questionsDeveloper: data.questionsDeveloper,
        questionsStudent: data.questionsStudent,
        questionsResearcher: data.questionsResearcher,
        // ...
        updatedAt,
      },
    });
    this.unblock();
    // ...
    const userId = Meteor.userId();
    if (ownerId !== userId && canAlert) {
      const member = Meteor.users.findOne({ _id: userId });
      // - Notif 108
      Meteor.call("notification.insert.seeker", {
        seekerId: seeker._id,
        data: {
          createdAt: new Date(),
          data: {
            type: "program_updated",
            orgName: seeker.organization,
            progName: program.title,
            progId: program._id,
            memberName: member.profile.firstName,
          },
        },
      });
    }
  },
  // ...
  "program.publish"({ data }) {
    ifYouAre(["SEEKER_OWNER"]);
    ProgramCollection.update({ _id: data._id }, { $set: { published: true } });
    this.unblock();
    // ...
    const program = ProgramCollection.findOne({ _id: data._id });
    const seeker = SeekerCollection.findOne({ _id: program.seekerId });
    const owner = seeker.owner();
    // - Email
    const email = owner.emails[0].address;
    const name = owner.profile.firstName;
    Accounts.sendProgramSubmissionEmail({
      to: email,
      name,
      program: program.title,
    });
  },
  "program.delete"({ id }) {
    ifYouAre(["SEEKER_OWNER"]);
    // ...
    const program = ProgramCollection.findOne(id);
    // ...
    ApplicationCollection.remove({ programId: program._id });
    WorkplaceCollection.remove(program.workplaceId);
    TeamCollection.remove({ workplaceId: program.workplaceId });
    ProgramCollection.remove(id);
  },
  "program.evaluators.add"({ id, data }) {
    ifYouAre(["SEEKER_OWNER"]);
    ProgramCollection.update(id, { $push: { evaluatorsId: data } });
    this.unblock();
    // ...
    const program = ProgramCollection.findOne({ _id: id });
    const seeker = SeekerCollection.findOne({ _id: program.seekerId });
    // - Notif 94
    Meteor.call("notification.insert.evaluator", {
      evalId: data,
      data: {
        createdAt: new Date(),
        data: {
          type: "evaluator_new_program",
          orgName: seeker.organization,
          progName: program.title,
          progId: program._id,
        },
      },
    });
    // - Email 95
    const evalOwner = Meteor.users.findOne({ evaluatorId: data });
    const email = evalOwner.emails[0].address;
    Accounts.sendEvaluatorProgramAssign({
      to: email,
      orgName: seeker.organization,
      program: program.title,
    });
  },
  "program.evaluators.delete"({ id, data }) {
    ifYouAre(["SEEKER_OWNER"]);
    ProgramCollection.update(id, { $pull: { evaluatorsId: data } });
  },
  "program.admin.accept"({ progId }) {
    ifYouAre(["ADMIN_ADMIN", "ADMIN_MEMBER"]);
    ProgramCollection.update({ _id: progId }, { $set: { accepted: true } });
    this.unblock();
    // ...
    const program = ProgramCollection.findOne({ _id: progId });
    const seeker = SeekerCollection.findOne({ _id: program.seekerId });
    const owner = seeker.owner();
    // - Notif 72
    Meteor.call("notification.insert.seeker", {
      seekerId: seeker._id,
      data: {
        createdAt: new Date(),
        data: {
          type: "program_publish",
          orgName: seeker.organization,
          progName: program.title,
          progId: program._id,
        },
      },
    });
    // - Notif 77
    const progTarget = program.targetAudience.map((t) => t.value);
    Meteor.call("notification.insert.solver.types", {
      types: [...progTarget],
      data: {
        createdAt: new Date(),
        data: {
          type: "program_new",
          orgName: seeker.organization,
          progName: program.title,
          progId: program._id,
        },
      },
    });
    // - Email 73
    const email = owner.emails[0].address;
    const name = owner.profile.firstName;
    Accounts.sendProgramPublishEmail({
      to: email,
      name,
      program: program.title,
    });
    // - Email 77
    Accounts.sendSolverNewProgramEmail({
      progId: program._id,
      progTitle: program.title,
      progTarget,
    });
  },
  "program.admin.decline"({ progId }) {
    ifYouAre(["ADMIN_ADMIN", "ADMIN_MEMBER"]);
    ProgramCollection.update({ _id: progId }, { $set: { accepted: false } });
  },
});
