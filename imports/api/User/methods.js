import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

import EvaluatorCollection from "/imports/api/Evaluator";
import ProgramCollection from "/imports/api/Program";
import SeekerCollection from "/imports/api/Seeker";
import SeekerPlanCollection from "/imports/api/SeekerPlan";
import SolverCollection from "/imports/api/Solver";

import { throwError } from "../helpers";

const getUserData = (user) => ({
  username: user.email,
  email: user.email,
  password: user.password,
  profile: {
    firstName: user.firstName,
    lastName: user.lastName,
  },
});

const getMemberData = (member) => ({
  username: member.email,
  email: member.email,
  profile: {
    firstName: member.firstName,
    lastName: member.lastName,
  },
});

Accounts.validateLoginAttempt((options) => {
  const { user } = options;
  if (!user || !user.emails) return false;
  // ...
  if (user.emails[0].verified && user.accepted) {
    return true;
  }
  if (!user.accepted) {
    throw new Meteor.Error("Error", "Account not accepted");
  }
  // - Send Verification email
  if (!user.emails[0].verified) {
    Accounts.sendVerificationEmail(user._id, user.emails[0].address);
    throw new Meteor.Error("Error", "Email not verified");
  }
  // ...
  return false;
});

Meteor.methods({
  //
  // Solver
  //

  "user.solver.register"({ user, solver }) {
    const userData = getUserData(user);
    // - Create user
    const userId = Accounts.createUser(userData);
    Roles.addUsersToRoles(userId, ["SOLVER_OWNER"], Roles.GLOBAL_GROUP);
    // - Create Solver
    const createdAt = new Date();
    const solverId = SolverCollection.insert({
      ownerId: userId,
      createdAt,
      ...solver,
      notifications: {
        items: [
          {
            createdAt: new Date(),
            data: { type: "oifa_welcome" },
          },
        ],
      },
    });
    // - Link user-seeker
    Meteor.users.update(userId, {
      $set: {
        solverId,
        accepted: false,
        omborded: true,
      },
    });
    // - Send Verification email
    Accounts.sendVerificationEmail(userId, userData.email);
  },

  //
  // Seeker
  //

  "user.seeker.verify"({ email, taxNumber }) {
    const user = Accounts.findUserByEmail(email);
    const tax = SeekerCollection.findOne({ taxRegistrationNumber: taxNumber });
    return { user, tax };
  },
  "user.seeker.register"({ user, seeker }) {
    const userData = getUserData(user);
    // - Create user
    const userId = Accounts.createUser(userData);
    Roles.addUsersToRoles(userId, ["SEEKER_OWNER"], Roles.GLOBAL_GROUP);
    // - Create Seeker
    const createdAt = new Date();
    const seekerId = SeekerCollection.insert({
      ownerId: userId,
      createdAt,
      ...seeker,
      notifications: {
        items: [
          {
            createdAt: new Date(),
            data: { type: "oifa_welcome" },
          },
        ],
      },
    });
    // - Create Seeker-Plan
    const type = seeker.plan === "SUBSCRIPTION" ? "SUBSCRIPTION" : "PAYG";
    const planId = SeekerPlanCollection.insert({ type, seekerId });
    // - Link User-Seeker
    Meteor.users.update(userId, {
      $set: {
        seekerId,
        accepted: false,
        omborded: false,
      },
    });
    // - Link Seeker-Plan
    SeekerCollection.update(seekerId, {
      $set: {
        planId,
      },
    });
    // - Send Verification email
    Accounts.sendVerificationEmail(userId, userData.email);
  },

  //
  // Seeker Member
  //

  "user.seeker.member.add"({ member }) {
    const owner = Meteor.user();
    const seekerId = owner.seekerId;
    // ...
    const memberData = getMemberData(member);
    // - Create Member
    const memberId = Accounts.createUser(memberData);
    Roles.addUsersToRoles(memberId, [member.role], Roles.GLOBAL_GROUP);
    // - Link user-seeker
    Meteor.users.update(memberId, {
      $set: {
        seekerId,
        omborded: true,
      },
    });
    // - Invite Member
    Accounts.sendEnrollmentEmail(memberId, member.email, {});
  },
  "user.seeker.member.edit"({ member }) {
    Meteor.roleAssignment.update(
      { "user._id": member._id },
      {
        $set: {
          "role._id": member.role,
          inheritedRoles: [{ _id: member.role }],
        },
      }
    );
    // - Edit Member
    Meteor.users.update(member._id, {
      $set: {
        profile: { firstName: member.firstName, lastName: member.lastName },
      },
    });
  },

  //
  // Seeker Evaluator
  //

  "user.seeker.evaluator.add"({ member }) {
    const owner = Meteor.user();
    const seekerId = owner.seekerId;
    const user = Accounts.findUserByEmail(member.email);
    // ...
    if (user) {
      // Add Evaluator as member
      EvaluatorCollection.update(
        { _id: user.evaluatorId },
        { $push: { seekersId: seekerId } }
      );
    } else {
      // - Create Evaluator
      const memberData = getMemberData(member);
      const memberId = Accounts.createUser(memberData);
      Roles.addUsersToRoles(memberId, [member.role], Roles.GLOBAL_GROUP);
      const evaluatorId = EvaluatorCollection.insert({
        ownerId: memberId,
        seekersId: [seekerId],
        notifications: {
          items: [
            {
              createdAt: new Date(),
              data: { type: "oifa_welcome" },
            },
          ],
        },
      });
      // - Link user-evaluator
      Meteor.users.update(memberId, {
        $set: {
          evaluatorId,
          omborded: true,
        },
      });
      // - Invite Member
      Accounts.sendEnrollmentEmail(memberId, member.email, {});
    }
  },
  "user.seeker.evaluator.delete"({ evaluatorId }) {
    const owner = Meteor.user();
    const seekerId = owner.seekerId;
    // - Delete seeker-programs-evaluator
    ProgramCollection.update(
      {
        seekerId,
        evaluatorsId: { $elemMatch: { $eq: evaluatorId } },
      },
      { evaluatorsId: { $pull: evaluatorId } }
    );
    // - Unlink Seeker-evaluator
    EvaluatorCollection.update(
      { _id: evaluatorId },
      { $pull: { seekersId: seekerId } }
    );
  },

  //
  // Admin
  //

  "user.admin.member.add"({ member }) {
    const memberData = getMemberData(member);
    // - Create Member
    const memberId = Accounts.createUser(memberData);
    Roles.addUsersToRoles(memberId, ["ADMIN_MEMBER"], Roles.GLOBAL_GROUP);
    // - Link user-seeker
    Meteor.users.update(memberId, {
      $set: {
        omborded: true,
      },
    });
    // - Invite Member
    Accounts.sendEnrollmentEmail(memberId, member.email, {});
  },
  "user.admin.seeker.accept"({ data }) {
    const seeker = SeekerCollection.findOne({ _id: data._id });
    const owner = seeker.owner();
    // ...
    SeekerCollection.update({ _id: data._id }, { $set: { accepted: true } });
    Meteor.users.update(owner._id, {
      $set: {
        accepted: true,
      },
    });
    // ...
    const email = owner.emails[0].address;
    const name = owner.profile.firstName;
    Accounts.sendWelcomeSeekerEmail({ to: email, name });
  },
  "user.admin.solver.accept"({ data }) {
    const solver = SolverCollection.findOne({ _id: data._id });
    const owner = solver.owner();
    // ...
    SolverCollection.update({ _id: data._id }, { $set: { accepted: true } });
    Meteor.users.update(owner._id, {
      $set: {
        accepted: true,
      },
    });
    // ...
    const email = owner.emails[0].address;
    const name = owner.profile.firstName;
    Accounts.sendWelcomeSolverEmail({ to: email, name });
  },

  //
  // Common
  //

  "user.verify"({ email }) {
    const user = Accounts.findUserByEmail(email);
    return { user };
  },
  "user.verify.email"({ token }) {
    const user = Meteor.users.findOne({
      "services.email.verificationTokens": {
        $elemMatch: { token: { $eq: token } },
      },
    });
    // ...
    if (!user) throwError("token-expired", "Verify user email");
    // ...
    let email = "";
    let emailIndex = 0;
    // - Get Email
    user.services?.email?.verificationTokens?.forEach((el) => {
      if (el.token === token) email = el.address;
    });
    // - Get Email Index
    user.emails.forEach((el, index) => {
      if (el.address === email) emailIndex = index;
    });
    // ...
    Meteor.users.update(
      { _id: user._id },
      {
        $set: {
          "services.email.verificationTokens": [],
          [`emails.${emailIndex}.verified`]: true,
        },
      }
    );
    // ...
    return { userId: user?._id ?? null };
  },
  "user.member.register.get"({ token }) {
    const user = Meteor.users.findOne({
      "services.password.enroll.token": token,
    });
    // ...
    const profile = user.profile;
    const email = user.emails[0].address;
    // ...
    return { email, ...profile };
  },
  "user.member.register.set"({ firstName, lastName, token }) {
    Meteor.users.update(
      {
        "services.password.enroll.token": token,
      },
      { $set: { accepted: true, profile: { firstName, lastName } } }
    );
  },
  "user.member.invite"({ member }) {
    const user = Meteor.users.findOne(member._id);
    if (!user) return;
    // ...
    const memberId = user?._id;
    const email = user?.emails[0]?.address;
    // - Invite Member
    Accounts.sendEnrollmentEmail(memberId, email, {});
  },
  "user.member.toggle"({ memberId, toggle }) {
    Meteor.users.update(
      {
        _id: memberId,
      },
      { $set: { accepted: toggle } }
    );
  },
  "user.member.delete"({ memberId }) {
    Meteor.users.remove(memberId);
  },

  //
  // Seetings
  //

  "user.settings.profile"({ data }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    Meteor.users.update(
      { _id: userId },
      {
        $set: {
          profile: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      }
    );
  },
  "user.settings.profile.seeker"({ data }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    const user = Meteor.user();
    const seekerId = user.seekerId;
    // ...
    SeekerCollection.update(
      { _id: seekerId },
      {
        $set: {
          jobPosition: data.jobPosition,
        },
      }
    );
  },
  "user.settings.profile.solver"({ data }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    const user = Meteor.user();
    const solverId = user.solverId;
    // ...
    SolverCollection.update(
      { _id: solverId },
      {
        $set: {
          firstName: data.firstName,
          lastName: data.lastName,
          jobPosition: data.jobPosition,
        },
      }
    );
  },
  "user.settings.emails.new"({ email }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    try {
      Accounts.addEmail(userId, email);
      Accounts.sendVerificationEmail(userId, email);
    } catch (err) {
      throw new Meteor.Error("Error", "Email is used");
    }
  },
  "user.settings.emails.new.invite"({ email }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    Accounts.sendVerificationEmail(userId, email);
  },
  "user.settings.emails.primary"({ email }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    const user = Meteor.user();
    const filteredEmails = user?.emails.filter((em) => em.address !== email);
    const newEmails = [{ address: email, verified: true }, ...filteredEmails];
    // ...
    Meteor.users.update(
      { _id: userId },
      {
        $set: {
          emails: [...newEmails],
        },
      }
    );
  },
  "user.settings.emails.remove"({ email }) {
    const userId = Meteor.userId();
    if (!userId) return false;
    // ...
    Accounts.removeEmail(userId, email);
  },
});
