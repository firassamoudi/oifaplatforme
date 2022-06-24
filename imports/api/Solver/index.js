import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import ApplicationCollection from "../Application";
import NotificationsSchema from "../Notification";

const SolverCollection = new Mongo.Collection("solvers");

// S, DD, ST, R

SolverCollection.schema = new SimpleSchema({
  imgId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
  // - Type
  type: { type: String },
  booked: { type: Boolean, defaultValue: false },
  // - Stratup
  organization: { type: String, optional: true },
  websiteLink: { type: String, optional: true },
  foundedDate: { type: String, optional: true },
  // 1 => 7
  description: { type: String, optional: true },
  sector: { type: Array, optional: true },
  "sector.$": { type: Object },
  "sector.$.label": { type: String },
  "sector.$.value": { type: String },
  maturityLevel: { type: String, optional: true },
  trackRecordNbClient: { type: String, optional: true },
  trackRecordClientsPartners: { type: String, optional: true },
  trackRecordCommunitySize: { type: String, optional: true },
  trackRecordRevenue: { type: String, optional: true },
  pitchDeck: { type: String, optional: true },
  demoLink: { type: String, optional: true },
  // 12
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
  // 14

  // DD
  // 1 => 8
  experience: { type: String, optional: true },
  portfolioLink: { type: String, optional: true },
  // 11 => 14

  // ST
  // 1 => 8
  degree: { type: String, optional: true },
  // 10
  yearsToGraduate: { type: String, optional: true },
  internship: { type: String, optional: true },
  // 11
  // 13
  // 14

  // - Researcher
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  jobPosition: { type: String, optional: true },
  phoneNumber: { type: String, optional: true },
  country: { type: String, optional: true },
  city: { type: String, optional: true },
  linkedinLink: { type: String, optional: true },
  expertise: { type: String, optional: true },
  institution: { type: String, optional: true },
  capabilities: { type: Array, defaultValue: [], optional: true },
  "capabilities.$": { type: Object },
  "capabilities.$.label": { type: String },
  "capabilities.$.value": { type: String },
  trackRecord: { type: String, optional: true },
  trackRecordFiles: { type: Array, defaultValue: [], optional: true },
  "trackRecordFiles.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  openInnovationExperience: { type: String, optional: true },
  hearAboutUs: { type: String, defaultValue: "", optional: true },
  hearAboutUsOther: { type: String, defaultValue: "", optional: true },
  // ...
  accepted: { type: Boolean, defaultValue: false },
  // ...
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  visited: { type: Array, defaultValue: [], optional: true },
  "visited.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  notifications: {
    type: NotificationsSchema,
    defaultValue: {},
    optional: true,
  },
});

SolverCollection.attachSchema(SolverCollection.schema);

SolverCollection.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },
  applications() {
    return ApplicationCollection.find({ solverId: this._id });
  },
  getOrgName() {
    const org = this.organization;
    const fn = this.firstName;
    const ln = this.lastName;
    return org ?? `${fn} ${ln}`;
  },
  getAvatar() {
    const org = this.organization;
    const fn = this.firstName;
    const ln = this.lastName;
    return org?.slice(0, 2) ?? `${fn} ${ln}`;
  },
  hasApplied({ progId }) {
    const applied = ApplicationCollection.findOne({
      solverId: this._id,
      programId: progId,
    });
    return !!applied;
  },
});

export default SolverCollection;
