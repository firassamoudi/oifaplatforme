import SimpleSchema from "simpl-schema";

const TeamMessageSchema = new SimpleSchema({
  createdAt: { type: Date },
  content: { type: String, defaultValue: "", optional: true },
  files: { type: Array, defaultValue: [], optional: true },
  "files.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
});

export default TeamMessageSchema;
