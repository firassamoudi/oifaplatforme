import { check } from "meteor/check";

import TasksCollection from ".";

Meteor.methods({
  "tasks.insert"(teamId, columnId, title) {
    check(teamId, String);
    check(columnId, String);
    check(title, String);
    const TaskId = TasksCollection.insert({
      title,
      expirationDate: "",
      taskDescription: "",
      attachments: [],
      teamId,
    });

    Meteor.call("teams.tasks.insert", TaskId, teamId, columnId);
  },
  "tasks.update"(taskId, title) {
    check(taskId, String);
    check(title, String);
    return TasksCollection.update(taskId, {
      $set: { title },
    });
  },
  "tasks.remove"(task, teamId, columnId, taskIndex) {
    check(task, String);
    check(teamId, String);
    check(columnId, String);
    check(taskIndex, Number);
    Meteor.call("teams.tasks.remove", task, teamId, columnId, taskIndex);
    TasksCollection.remove(task);
  },
});
