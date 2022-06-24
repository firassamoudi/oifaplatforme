import SimpleSchema from "simpl-schema";

import TeamMessageSchema from "../TeamMessage";
import TeamTaskSchema from "../TeamTask";

const TeamCollection = new Mongo.Collection("teams");

TeamCollection.schema = new SimpleSchema({
  title: { type: String },
  members: { type: Array },
  "members.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  board: { type: Object, defaultValue: {}, optional: true },
  "board.todo": { type: Array, defaultValue: [], optional: true },
  "board.todo.$": { type: TeamTaskSchema },
  "board.doing": { type: Array, defaultValue: [], optional: true },
  "board.doing.$": { type: TeamTaskSchema },
  "board.done": { type: Array, defaultValue: [], optional: true },
  "board.done.$": { type: TeamTaskSchema },
  // ...
  messages: { type: Array, defaultValue: [], optional: true },
  "messages.$": { type: TeamMessageSchema },
  // ...
  workplaceId: { type: String, regEx: SimpleSchema.RegEx },
});

TeamCollection.attachSchema(TeamCollection.schema);

TeamCollection.helpers({
  owner() {
    return { owner: "wip" };
  },
});

export default TeamCollection;
