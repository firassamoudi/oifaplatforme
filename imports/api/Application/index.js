import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import ProgramCollection from "../Program";
import SolverCollection from "../Solver";

const ApplicationCollection = new Mongo.Collection("applications");

ApplicationCollection.schema = new SimpleSchema({
  // - Base Solver Data
  organization: { type: String, optional: true },
  websiteLink: { type: String, optional: true },
  foundedDate: { type: String, optional: true },
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  jobPosition: { type: String, optional: true },
  phoneNumber: { type: String, optional: true },
  country: { type: String, optional: true },
  city: { type: String, optional: true },
  email: { type: String, optional: true },
  solution: { type: Object, defaultValue: {}, optional: true, blackbox: true },
  // ...
  founders: { type: Array, defaultValue: [], optional: true },
  "founders.$": { type: Object },
  "founders.$.firstName": { type: String },
  "founders.$.lastName": { type: String },
  "founders.$.position": { type: String },
  "founders.$.linkedinLink": { type: String },
  members: { type: Array, defaultValue: [], optional: true },
  "members.$": { type: Object },
  "members.$.firstName": { type: String },
  "members.$.lastName": { type: String },
  "members.$.position": { type: String },
  "members.$.linkedinLink": { type: String },
  // ...
  hearAboutUs: { type: String, defaultValue: "", optional: true },
  hearAboutUsOther: { type: String, defaultValue: "", optional: true },
  // ...
  criteria: { type: Array, optional: true },
  "criteria.$": { type: Object },
  "criteria.$.question": { type: String },
  "criteria.$.answer": { type: String },
  // ...
  evaluations: { type: Array, defaultValue: [], optional: true },
  "evaluations.$": { type: Object },
  "evaluations.$.dateStart": { type: Date },
  "evaluations.$.dateEnd": { type: Date },
  "evaluations.$.feedback": { type: String },
  "evaluations.$.ownerId": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  // ...
  "evaluations.$.criteria": { type: Array, optional: true },
  "evaluations.$.criteria.$": { type: Object },
  "evaluations.$.criteria.$.label": { type: String },
  "evaluations.$.criteria.$.value": { type: Number },
  // ...
  evaluated: { type: Boolean, defaultValue: false, optional: true },
  accepted: { type: Boolean, defaultValue: false, optional: true },
  published: { type: Boolean, defaultValue: false, optional: true },
  dropped: { type: Boolean, defaultValue: false, optional: true },
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  solverId: { type: String, regEx: SimpleSchema.RegEx.Id },
  programId: { type: String, regEx: SimpleSchema.RegEx.Id },
  teamId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  // ...
  createdAt: { type: Date, defaultValue: null, optional: true },
  updatedAt: { type: Date, defaultValue: null, optional: true },
});

ApplicationCollection.attachSchema(ApplicationCollection.schema);

ApplicationCollection.helpers({
  owner() {
    return Meteor.users.findOne(this.ownerId);
  },
  solver() {
    return SolverCollection.findOne(this.solverId);
  },
  team() {
    return { team: "wip" };
  },
  program() {
    return ProgramCollection.findOne(this.programId);
  },
});

export default ApplicationCollection;
