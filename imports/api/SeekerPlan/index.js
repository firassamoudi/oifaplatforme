import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const SeekerPlanCollection = new Mongo.Collection("seeker_plan");

// SUBSCRIPTION
// PAYG

SeekerPlanCollection.schema = new SimpleSchema({
  type: { type: String },
  startDate: { type: Date, defaultValue: null, optional: true },
  endDate: { type: Date, defaultValue: null, optional: true },
  // ...
  programsCurrent: { type: Number, defaultValue: 0 },
  connexionsCurrent: { type: Number, defaultValue: 0 },
  // ...
  billings: { type: Array, defaultValue: [], optional: true },
  "billings.$": { type: Object },
  "billings.$.startDate": { type: Date },
  "billings.$.endDate": { type: Date },
  "billings.$.fileId": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  seekerId: { type: String, regEx: SimpleSchema.RegEx.Id },
});

SeekerPlanCollection.attachSchema(SeekerPlanCollection.schema);

SeekerPlanCollection.helpers({
  canAddProgram() {
    const nowDate = new Date();
    // ...
    if (this.type === "SUBSCRIPTION") {
      return !!this.programsCurrent && nowDate <= this.endDate;
    }
    if (this.type === "PAYG") {
      return !!this.programsCurrent;
    }
    return false;
  },
  canMakeConnexion() {
    const nowDate = new Date();
    // ...
    if (this.type === "SUBSCRIPTION") {
      return !!this.connexionsCurrent && nowDate <= this.endDate;
    }
    if (this.type === "PAYG") {
      return !!this.connexionsCurrent;
    }
    return false;
  },
});

export default SeekerPlanCollection;
