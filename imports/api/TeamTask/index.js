import SimpleSchema from "simpl-schema";

const TeamTaskSchema = new SimpleSchema({
  key: { type: Number },
  title: { type: String },
  date: { type: Date, optional: true },
  description: { type: String, optional: true },
  // files: { type: Array },
  // "files.$": { type: Object },
});

export default TeamTaskSchema;
