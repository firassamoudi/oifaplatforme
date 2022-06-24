import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import NotificationsSchema from "../Notification";
import ProgramCollection from "../Program";
import SeekerPlanCollection from "../SeekerPlan";

const SeekerCollection = new Mongo.Collection("seekers");

SeekerCollection.schema = new SimpleSchema({
  imgId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
  // ...
  organization: { type: String },
  taxRegistrationNumber: { type: String },
  planId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  booked: { type: Boolean, defaultValue: false },
  jobPosition: { type: String, optional: true },
  websiteLink: { type: String, optional: true },
  description: { type: String, optional: true },
  sector: { type: Array, optional: true },
  "sector.$": { type: Object },
  "sector.$.label": { type: String },
  "sector.$.value": { type: String },
  operateCountries: { type: Array, optional: true },
  "operateCountries.$": { type: Object },
  "operateCountries.$.label": { type: String },
  "operateCountries.$.value": { type: String },
  interestedMarket: { type: Array, optional: true },
  "interestedMarket.$": { type: Object },
  "interestedMarket.$.label": { type: String },
  "interestedMarket.$.value": { type: String },
  headOffice: { type: String, optional: true },
  address: { type: String, optional: true },
  city: { type: String, optional: true },
  postalCode: { type: String, optional: true },
  interestedTheme: { type: Array, optional: true },
  "interestedTheme.$": { type: Object },
  "interestedTheme.$.label": { type: String },
  "interestedTheme.$.value": { type: String },
  // ...
  accepted: { type: Boolean, defaultValue: false },
  // ...
  ownerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  solversId: { type: Array, defaultValue: [], optional: true },
  "solversId.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  programsId: { type: Array, optional: true },
  "programsId.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  notifications: {
    type: NotificationsSchema,
    defaultValue: {},
    optional: true,
  },
});

SeekerCollection.attachSchema(SeekerCollection.schema);

SeekerCollection.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },
  plan() {
    return SeekerPlanCollection.findOne({
      _id: this.planId,
      seekerId: this._id,
    });
  },
  programs() {
    return ProgramCollection.find({ seekerId: this._id }).fetch();
  },
  getOrgName() {
    return this.organization;
  },
  getAvatar() {
    return this.organization;
  },
  isConnectedToThisSolver(solverId) {
    return this.solversId.indexOf(solverId) > -1;
  },
});

export default SeekerCollection;
