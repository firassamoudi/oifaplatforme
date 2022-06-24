import SimpleSchema from "simpl-schema";

const SubscribeCollection = new Mongo.Collection("subscribers");

SubscribeCollection.schema = new SimpleSchema({
  email: { type: String },
  date: { type: Date },
});

SubscribeCollection.attachSchema(SubscribeCollection.schema);

export default SubscribeCollection;
