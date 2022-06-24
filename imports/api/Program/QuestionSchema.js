import SimpleSchema from "simpl-schema";

const QuestionSchema = new SimpleSchema({
  id: { type: String, defaultValue: "" },
  type: { type: String, defaultValue: "" },
  label: { type: String, defaultValue: "" },
  response: { type: String, defaultValue: "", optional: true },
  placeholder: { type: String, defaultValue: "", optional: true },
  options: { type: Array, defaultValue: [], optional: true },
  "options.$": { type: String },
  basic: { type: Boolean, defaultValue: false },
  selected: { type: Boolean, defaultValue: true },
  required: { type: Boolean, defaultValue: false },
});

export default QuestionSchema;
