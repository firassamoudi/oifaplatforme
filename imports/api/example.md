import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// https://guide.meteor.com/collections.html

// Required if there is no hooks
const TutoCollection = new Mongo.Collection("tutos");

// Required if there is hooks
class Tuto extends Mongo.Collection {
  insert(tuto, cb) {
    // Side effects goes here
    // Ex: Send Emails, ...
    // Call the original `insert` method
    // ...
    // Use Denormalizers "recommended for muliple collections"
    // https://guide.meteor.com/collections.html#abstracting-denormalizers
    return super.insert(tuto, cb);
  }
}

const TutoCollection = new Tuto("tutos");

// Required - Schema definition
TutoCollection.schema = new SimpleSchema({
  name: { type: String },
  age: { type: Number, defaultValue: 0, optional: true },
});

// Required - this will auto test against every mutator call (insert, update, upsert)
TutoCollection.attachSchema(TutoCollection.schema);
// check this link for more info
// https://guide.meteor.com/collections.html#validating-schemas

// Associations
// Required - Associations usind Collection helpers "recommended"
// https://guide.meteor.com/collections.html#collection-helpers
TutoCollection.helpers({
  owner() {
    // Ex: Get owner
    // Ex: Get members
    return TutoCollection.find({ userId: this.userId });
  },
});
// Client example :
// let tuto = TutoCollection.findOne();
// let owner = tuto.owner();

// Aggregation
// Check Mongodb doc

// Migration
// https://guide.meteor.com/collections.html#writing-migrations

export default TutoCollection;
