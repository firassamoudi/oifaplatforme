import { Meteor } from "meteor/meteor";

import { ifYouAre } from "../helpers";
import ProgramCollection from "../Program";
import SolverCollection from ".";

Meteor.methods({
  "solver.update"({ data }) {
    ifYouAre(["SOLVER_OWNER"]);
    // ...
    const user = Meteor.user();
    const solverId = user.solverId;
    // ...
    SolverCollection.update(solverId, { $set: { ...data } });
  },
  "solver.update.img"({ data }) {
    ifYouAre(["SOLVER_OWNER"]);
    // ...
    const user = Meteor.user();
    const solverId = user.solverId;
    // ...
    SolverCollection.update(solverId, { $set: { imgId: data } });
  },
  "solver.program.visited"({ progId }) {
    ifYouAre(["SOLVER_OWNER"]);
    const user = Meteor.user();
    const solverId = user.solverId;
    if (!solverId) return;
    const solver = SolverCollection.findOne(solverId);
    const visited = solver.visited.indexOf(progId) > -1;
    // ...
    if (!visited) {
      ProgramCollection.update(progId, { $inc: { visitors: 1 } });
      SolverCollection.update(solverId, { $push: { visited: progId } });
    }
  },
});
