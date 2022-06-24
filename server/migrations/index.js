import SolverCollection from "/imports/api/Solver";

// Bulk operations use  Collection#rawCollection()

Migrations.add({
  version: 2,
  up() {
    SolverCollection.find({}).forEach((solver) => {
      const blues = 0;
      SolverCollection.update(solver._id, { $set: { blues } });
    });
  },
  down() {
    SolverCollection.update({}, { $unset: { blues: true } }, { multi: true });
  },
});

Migrations.add({
  version: 1,
  up() {
    SolverCollection.find({}).forEach((solver) => {
      const extra = "extra value v1";
      SolverCollection.update(solver._id, { $set: { extra } });
    });
  },
  down() {
    SolverCollection.update({}, { $unset: { extra: true } }, { multi: true });
  },
});
