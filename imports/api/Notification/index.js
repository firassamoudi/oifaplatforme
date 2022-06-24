import SimpleSchema from "simpl-schema";

const NotificationSchema = new SimpleSchema({
  seen: { type: Date, defaultValue: null, optional: true },
  items: { type: Array, defaultValue: [], optional: true },
  "items.$": { type: Object },
  "items.$.createdAt": { type: Date },
  "items.$.data": { type: Object, blackbox: true },
});

export default NotificationSchema;
