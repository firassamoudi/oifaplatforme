import { Meteor } from "meteor/meteor";

import ApplicationCollection from "../Application";
import ProgramsCollection from "../Program";
import SeekerCollection from "../Seeker";
import SolversCollection from "../Solver";
import TeamCollection from "../Team";
import WorkplaceCollection from ".";

Meteor.publishComposite("workplace", function ({ workplaceId }) {
  const userId = this.userId;
  if (!userId) return this.ready();
  // ...
  return {
    find() {
      return WorkplaceCollection.find({ _id: workplaceId });
    },
    children: [
      {
        find(workplace) {
          return TeamCollection.find({ workplaceId: workplace._id });
        },
      },
      {
        find(workplace) {
          return ProgramsCollection.find({ _id: workplace.programId });
        },
        children: [
          {
            find(program) {
              return SeekerCollection.find({
                _id: program.seekerId,
              });
            },
          },
          {
            find(program) {
              return ApplicationCollection.find({
                programId: program._id,
                accepted: true,
              });
            },
            children: [
              {
                find(application) {
                  return SolversCollection.find({ _id: application.solverId });
                },
              },
            ],
          },
        ],
      },
    ],
  };
});
