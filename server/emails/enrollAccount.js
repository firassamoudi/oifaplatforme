/* eslint-disable indent */
/* eslint-disable prettier/prettier */

import EvaluatorCollection from "/imports/api/Evaluator";
import SeekerCollection from "/imports/api/Seeker";

import base from "./base";

export default (user, url) => {
  const regexp = /enroll-account\/(.+)/;
  const matchs = url.match(regexp);
  const link = `${process.env.ROOT_URL}/auth/register/member/${matchs[1]}`;
  // - Get User Role
  let userRole = "";
  // ...
  const isAdmin = Roles.userIsInRole(user._id, ["ADMIN_ADMIN", "ADMIN_MEMBER"]);
  const isCreator = Roles.userIsInRole(user._id, ["SEEKER_CREATOR"]);
  const isSearcher = Roles.userIsInRole(user._id, ["SEEKER_SEARCHER"]);
  const isEvaluator = Roles.userIsInRole(user._id, ["EVALUATOR_OWNER"]);
  // ...
  if (isAdmin) userRole = "Administrator";
  if (isCreator) userRole = "Creator";
  if (isSearcher) userRole = "Searcher";
  if (isEvaluator) userRole = "Evaluator";
  // ...
  let seeker = null;
  let seekerOwner = null;
  // ...
  if (user.seekerId) {
    seeker = SeekerCollection.findOne({ _id: user.seekerId });
    seekerOwner = Meteor.users.findOne({ _id: seeker.ownerId });
  } else if (user.evaluatorId) {
    const evaluator = EvaluatorCollection.findOne({ _id: user.evaluatorId });
    const seekerIds = evaluator.seekersId;
    const seekerId = seekerIds[seekerIds.length - 1];
    // ...
    seeker = SeekerCollection.findOne({ _id: seekerId });
    seekerOwner = Meteor.users.findOne({ _id: seeker.ownerId });
  }
  // ...
  return base({
    title: seeker && seekerOwner ? `Invitation to join the ${seeker.organization} team on OIFA` : "Invitation to join the the administration team",
    content: `
      <p>Welcome, ${user.profile.firstName}!</p> 
      ${seeker && seekerOwner
          ? `<p><b>${seekerOwner.profile.firstName}</b> added you as <b>${userRole}</b> to the <b>${seeker.organization}</b> team.</p>`
          : `<p>You have been added as <b>${userRole}</b> to the <b>administration</b> team.</p>`
      }
      <p>You can login to OIFA now to join your team and start exploring qualified African innovation talents.</p>
      <p>The OIFA Team</p>`,
    link,
    linkLabel: "Complete your account",
  });
};
