import { Mongo } from "meteor/mongo";

const TeamsCollection = new Mongo.Collection("Teams");

export default TeamsCollection;
