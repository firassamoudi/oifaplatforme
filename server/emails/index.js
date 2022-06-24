/* eslint-disable simple-import-sort/sort */
import { Accounts } from "meteor/accounts-base";
import { Email } from "meteor/email";

import EvaluatorCollection from "/imports/api/Evaluator";
import SolverCollection from "/imports/api/Solver";

// - Email Meteor
import enrollAccountEmail from "./enrollAccount";
import resetPassword from "./resetPassword";
import verifyEmail from "./verifyEmail";

// - Emails Custom
import welcomeSeekerEmail from "./welcomeSeeker";
import welcomeSolverEmail from "./welcomeSolver";
import programSubmissionEmail from "./programSubmission";
import programPublishEmail from "./programPublish";
import applicationsClosedEmail from "./applicationClosed";
// ...
import evaluatorProgramAssign from "./evaluatorProgramAssign";
import evaluatorProgramDeadlineEmail from "./evaluatorProgramDeadline";
// ...
import solverNewProgramEmail from "./solverNewProgram";
import solverFinishApplicationEmail from "./solverFinishApplication";
import solverProgramGoEmail from "./solverProgramGo";
import solverProgramGoNoEmail from "./solverProgramGoNo";
// ...
import subscriberEmail from "./subscriber";
import demoEmail from "./demo";
import demoEmailAdmin from "./demoAdmin";
import contactEmail from "./contact";
import contactEmailAdmin from "./contactAdmin";

const siteName = "OIFA - ";
const from = "hello@oifa.tech";
const baseSubject = "Welcome to OIFA platform";

Accounts.emailTemplates.siteName = siteName;
Accounts.emailTemplates.from = from;

// - EnrollAccount
Accounts.emailTemplates.enrollAccount = {
  subject() {
    return baseSubject;
  },
  html(user, url) {
    return enrollAccountEmail(user, url);
  },
};

// - VerifyEmail
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return baseSubject;
  },
  html(user, url) {
    return verifyEmail(user, url);
  },
};

// - ResetPassword
Accounts.emailTemplates.resetPassword = {
  subject() {
    return baseSubject;
  },
  html(user, url) {
    return resetPassword(user, url);
  },
};

//
// Custom Email
//

// - Welcome Email
Accounts.sendWelcomeSeekerEmail = ({ to, name }) => {
  const subject = "Welcome onboard! You’re now an OIFA member";
  const html = welcomeSeekerEmail({ name, email: from });
  // ...
  Email.send({ to, from, subject, html });
};
Accounts.sendWelcomeSolverEmail = ({ to, name }) => {
  const subject = "Welcome onboard! You’re now an OIFA member";
  const html = welcomeSolverEmail({ name, email: from });
  // ...
  Email.send({ to, from, subject, html });
};

// - Seeker Program
Accounts.sendProgramSubmissionEmail = ({ to, name, program }) => {
  const subject = "Your program submission has been sent for review";
  const html = programSubmissionEmail({ name, program });
  // ...
  Email.send({ to, from, subject, html });
};
Accounts.sendProgramPublishEmail = ({ to, name, program }) => {
  const subject = "Your program has been published";
  const html = programPublishEmail({ name, email: from, program });
  // ...
  Email.send({ to, from, subject, html });
};
Accounts.sendApplicationsClosedEmail = ({ to, progId, progTitle }) => {
  const subject = "Application phase is closed!";
  const html = applicationsClosedEmail({ progId, progTitle });
  // // ...
  Email.send({ to, from, subject, html });
};

// - Evaluator
Accounts.sendEvaluatorProgramAssign = ({ to, orgName, program }) => {
  const subject = "You have been assigned to new program";
  const html = evaluatorProgramAssign({ orgName, program });
  // ...
  Email.send({ to, from, subject, html });
};

const evaluatorEmailSender = (evaluators, from, subject, html) => {
  evaluators.forEach((evaluator) => {
    const ownerId = evaluator.ownerId;
    const user = Meteor.users.findOne(ownerId);
    const email = user.emails[0].address;
    // // ...
    Email.send({
      to: email,
      from,
      subject,
      html,
    });
  });
};

Accounts.sendEvaluatorProgramDeadlineEmail = ({ evaluatorIds, progTitle }) => {
  const subject = "Few hours left to evaluation deadline.";
  const html = evaluatorProgramDeadlineEmail({ progTitle });
  const evaluators = EvaluatorCollection.find({
    _id: { $in: [...evaluatorIds] },
  }).fetch();
  // ...
  evaluatorEmailSender(evaluators, from, subject, html);
};

// - Solvers
const solverEmailSender = (solvers, from, subject, html) => {
  solvers.forEach((solver) => {
    const ownerId = solver.ownerId;
    const user = Meteor.users.findOne(ownerId);
    const email = user.emails[0].address;
    // ...
    Email.send({
      to: email,
      from,
      subject,
      html,
    });
  });
};

Accounts.sendSolverNewProgramEmail = ({ progId, progTitle, progTarget }) => {
  const subject = "New challenges on OIFA for you";
  const html = solverNewProgramEmail({ email: from, progId, progTitle });
  const solvers = SolverCollection.find({
    type: { $in: [...progTarget] },
  }).fetch();
  // ...
  solverEmailSender(solvers, from, subject, html);
};

Accounts.sendSolverFinishApplicationEmail = ({ progTitle, solversIds }) => {
  const subject = "Close deadline! Finish your application";
  const html = solverFinishApplicationEmail({ progTitle });
  const solvers = SolverCollection.find({
    _id: { $in: [...solversIds] },
  }).fetch();
  // ...
  solverEmailSender(solvers, from, subject, html);
};

Accounts.sendSolverProgramGoEmail = ({
  progId,
  progTitle,
  seekerName,
  solversIds,
}) => {
  const subject = "Congrats! You have been selected";
  const html = solverProgramGoEmail({ progId, progTitle, seekerName });
  const solvers = SolverCollection.find({
    _id: { $in: [...solversIds] },
  }).fetch();
  // ...
  solverEmailSender(solvers, from, subject, html);
};

Accounts.sendSolverProgramGoNoEmail = ({
  progId,
  progTitle,
  seekerName,
  solversIds,
}) => {
  const subject = "Your application has been rejected";
  const html = solverProgramGoNoEmail({ progId, progTitle, seekerName });
  const solvers = SolverCollection.find({
    _id: { $in: [...solversIds] },
  }).fetch();
  // ...
  solverEmailSender(solvers, from, subject, html);
};

// - Subscriber
Accounts.sendSubscriberEmail = (to) => {
  const subject = baseSubject;
  const html = subscriberEmail();
  // ...
  Email.send({ to, from, subject, html });
};

// - Book Demos
Accounts.sendDemoEmail = (req) => {
  const subject = "Book a demo";
  const html = demoEmail({ data: req });
  const htmlAdmin = demoEmailAdmin({ data: req });
  // ...
  Email.send({ to: req.email, from, subject, html });
  Email.send({ to: from, from, subject, html: htmlAdmin });
};

// - Contact
Accounts.sendContactEmail = (req) => {
  const subject = "Contact OIFA";
  const html = contactEmail({ data: req });
  const htmlAdmin = contactEmailAdmin({ data: req });
  // ...
  Email.send({ to: req.email, from, subject, html });
  Email.send({ to: from, from, subject, html: htmlAdmin });
};
