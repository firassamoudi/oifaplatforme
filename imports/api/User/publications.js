import EvaluatorCollection from "../Evaluator";
import SeekerCollection from "../Seeker";
import SeekerPlanCollection from "../SeekerPlan";
import SolverCollection from "../Solver";

Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  return [
    Meteor.users.find(this.userId),
    Meteor.roleAssignment.find({ "user._id": this.userId }),
  ];
});

Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  const user = Meteor.user();
  const solverId = user.solverId;
  if (!solverId) return this.ready();
  return SolverCollection.find({ _id: solverId });
});

Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  const user = Meteor.user();
  const evaluatorId = user.evaluatorId;
  if (!evaluatorId) return this.ready();
  return EvaluatorCollection.find({ _id: evaluatorId });
});

Meteor.publishComposite(null, function () {
  if (!this.userId) return this.ready();
  const user = Meteor.user();
  const seekerId = user.seekerId;
  if (!seekerId) return this.ready();
  // ...
  return {
    find() {
      return SeekerCollection.find({ _id: seekerId });
    },
    children: [
      {
        find(seeker) {
          return SeekerPlanCollection.find({ seekerId: seeker._id });
        },
      },
    ],
  };
});

Meteor.publishComposite(null, function () {
  if (!this.userId) return this.ready();
  const user = Meteor.user();
  const seekerId = user.seekerId;
  if (!seekerId) return this.ready();
  // ...
  return {
    find() {
      return Meteor.users.find({ seekerId });
    },
    children: [
      {
        find(user) {
          return Meteor.roleAssignment.find({ "user._id": user._id });
        },
      },
    ],
  };
});

Meteor.publishComposite("admin-members", function () {
  if (!this.userId) return this.ready();

  return {
    find() {
      return Meteor.roleAssignment.find({ "role._id": "ADMIN_MEMBER" });
    },
    children: [
      {
        find(roleAssigned) {
          return Meteor.users.find({ _id: roleAssigned.user._id });
        },
      },
    ],
  };
});
