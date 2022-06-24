// db.myColleciton.update({},{$set: {newField: newValue}}, {multi: true});

import EvaluatorCollection from "../Evaluator";
import SeekerCollection from "../Seeker";
import SolverCollection from "../Solver";

Meteor.methods({
  "notification.insert.seeker"({ seekerId, data }) {
    SeekerCollection.update(seekerId, {
      $push: { "notifications.items": data },
    });
  },
  "notification.insert.evaluator"({ evalId, data }) {
    EvaluatorCollection.update(
      { _id: evalId },
      {
        $push: { "notifications.items": data },
      }
    );
  },
  "notification.insert.evaluator.ids"({ ids, data }) {
    EvaluatorCollection.update(
      { _id: { $in: [...ids] } },
      {
        $push: { "notifications.items": data },
      }
    );
  },
  "notification.insert.solver"({ solverId, data }) {
    SolverCollection.update(
      { _id: solverId },
      {
        $push: { "notifications.items": data },
      }
    );
  },
  "notification.insert.solver.ids"({ data, ids }) {
    SolverCollection.update(
      { _id: { $in: [...ids] } },
      {
        $push: { "notifications.items": data },
      },
      { multi: true }
    );
  },
  "notification.insert.solver.types"({ data, types }) {
    SolverCollection.update(
      { type: { $in: [...types] } },
      {
        $push: { "notifications.items": data },
      },
      { multi: true }
    );
  },
  // - Update LastSeen Notifications
  "notification.seen.seeker"({ seekerId }) {
    SeekerCollection.update(seekerId, {
      $set: { "notifications.seen": new Date() },
    });
  },
  "notification.seen.evaluator"({ evalId }) {
    EvaluatorCollection.update(
      { _id: evalId },
      {
        $set: { "notifications.seen": new Date() },
      }
    );
  },
  "notification.seen.solver"({ solverId }) {
    SolverCollection.update(
      { _id: solverId },
      {
        $set: { "notifications.seen": new Date() },
      }
    );
  },
});
