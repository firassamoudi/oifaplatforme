import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

import ApplicationCollection from "../Application";
import SeekerCollection from "../Seeker";
import WorkplaceCollection from "../Workplace";
import QuestionSchema from "./QuestionSchema";

const ProgramCollection = new Mongo.Collection("programs");

ProgramCollection.schema = new SimpleSchema({
  isCFA: { type: Boolean, defaultValue: false, optional: true },
  // - Details
  title: { type: String, defaultValue: "", optional: true },
  sector: { type: Array, defaultValue: [], optional: true },
  "sector.$": { type: Object },
  "sector.$.label": { type: String },
  "sector.$.value": { type: String },
  context: { type: String, optional: true },
  contextVideo: { type: String, optional: true },
  // - Visual
  imgId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  // - Incentive
  incentive: { type: Object, optional: true },
  "incentive.incubation": { type: String, optional: true },
  "incentive.cashPrize": { type: String, optional: true },
  "incentive.testProductOnMarket": { type: String, optional: true },
  "incentive.equipments": { type: String, optional: true },
  "incentive.trainings": { type: String, optional: true },
  "incentive.other": { type: String, optional: true },
  // - Copyright
  copyright: { type: String, optional: true },
  // - Timeline
  timeline: { type: Array, defaultValue: [], optional: true },
  "timeline.$": { type: Object },
  "timeline.$.label": { type: String, optional: true },
  "timeline.$.id": { type: String, defaultValue: "", optional: true },
  "timeline.$.start": { type: Date, optional: true },
  "timeline.$.end": { type: Date, optional: true },
  "timeline.$.required": { type: Boolean, defaultValue: false, optional: true },
  // - FAQ
  faq: { type: Array, defaultValue: [], optional: true },
  "faq.$": { type: Object },
  "faq.$.question": { type: String, defaultValue: "", optional: true },
  "faq.$.response": { type: String, defaultValue: "", optional: true },
  "faq.$.custom": { type: Boolean, defaultValue: false, optional: true },
  // - Target
  targetAudience: { type: Array, defaultValue: [], optional: true },
  "targetAudience.$": { type: Object },
  "targetAudience.$.label": { type: String },
  "targetAudience.$.value": { type: String },
  geographicalScope: { type: Array, defaultValue: [], optional: true },
  "geographicalScope.$": { type: Object },
  "geographicalScope.$.label": { type: String },
  "geographicalScope.$.value": { type: String },
  maturityLevel: { type: String, defaultValue: "", optional: true },
  capabilities: { type: Array, defaultValue: [], optional: true },
  "capabilities.$": { type: Object },
  "capabilities.$.label": { type: String },
  "capabilities.$.value": { type: String },
  criteria: { type: Array },
  "criteria.$": { type: Object },
  "criteria.$.label": { type: String },
  "criteria.$.selected": { type: Boolean },
  "criteria.$.types": { type: Array },
  "criteria.$.types.$": { type: String },
  // - Challenges
  challenges: { type: Array, defaultValue: [], optional: true },
  "challenges.$": { type: Object },
  "challenges.$.imgId": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  "challenges.$.title": { type: String, defaultValue: "", optional: true },
  "challenges.$.sector": { type: String, defaultValue: "", optional: true },
  "challenges.$.context": { type: String, optional: true },
  "challenges.$.contextVideo": { type: String, optional: true },
  "challenges.$.selected": {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  // - Application Questions
  questionsStartup: { type: Array, defaultValue: [] },
  "questionsStartup.$": { type: QuestionSchema },
  // ...
  questionsDesigner: { type: Array, defaultValue: [] },
  "questionsDesigner.$": { type: QuestionSchema },
  // ...
  questionsDeveloper: { type: Array, defaultValue: [] },
  "questionsDeveloper.$": { type: QuestionSchema },
  // ...
  questionsStudent: { type: Array, defaultValue: [] },
  "questionsStudent.$": { type: QuestionSchema },
  // ...
  questionsResearcher: { type: Array, defaultValue: [] },
  "questionsResearcher.$": { type: QuestionSchema },
  // ...
  evaluatorsId: { type: Array, defaultValue: [], optional: true },
  "evaluatorsId.$": { type: String, regEx: SimpleSchema.RegEx.Id },
  // ...
  published: { type: Boolean, defaultValue: false, optional: true },
  accepted: { type: Boolean, defaultValue: false, optional: true },
  seekerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  workplaceId: { type: String, regEx: SimpleSchema.RegEx.Id },
  visitors: { type: Number, defaultValue: 0, optional: true },
  // ...
  createdAt: { type: Date, defaultValue: null, optional: true },
  updatedAt: { type: Date, defaultValue: null, optional: true },
});

ProgramCollection.attachSchema(ProgramCollection.schema);

ProgramCollection.helpers({
  seeker() {
    return SeekerCollection.findOne({ _id: this.seekerId });
  },
  applications() {
    return ApplicationCollection.find({
      programId: this._id,
      published: true,
    }).fetch();
  },
  workplace() {
    return WorkplaceCollection.findOne({ _id: this.workplaceId });
  },
});

export default ProgramCollection;
