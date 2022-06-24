import { Mongo } from "meteor/mongo";

const TasksCollection = new Mongo.Collection("Tasks");

export default TasksCollection;
