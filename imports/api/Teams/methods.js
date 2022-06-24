import { check } from "meteor/check";

import TasksCollection from "../Tasks";
import TeamsCollection from ".";

Meteor.methods({
  "teams.insert"(teamName) {
    check(teamName, String);

    return TeamsCollection.insert({
      teamName,
      board: {
        "column-1": {
          title: "TO DO",
          tasks: [],
          id: "column-1",
        },
        "column-2": { title: "Doing", tasks: [], id: "column-2" },
        "column-3": { title: "Done", tasks: [], id: "column-3" },
        columnOrder: ["column-1", "column-2", "column-3"],
      },
      teamMembers: [],
    });
  },

  "teams.update"(teamId, teamName) {
    check(teamId, String);
    check(teamName, String);

    return TeamsCollection.update(teamId, { $set: { teamName } });
  },
  "teams.remove"(team) {
    check(team, Object);
    TasksCollection.remove({ teamId: team._id });
    return TeamsCollection.remove(team);
  },
  "teams.tasks.insert"(taskId, teamId, columnId) {
    check(taskId, String);
    check(teamId, String);
    check(columnId, String);
    return TeamsCollection.update(teamId, {
      $push: {
        [`board.${columnId}.tasks`]: taskId,
      },
    });
  },

  "teams.tasks.update"(teamId, board) {
    check(teamId, String);
    check(board, Object);
    return TeamsCollection.update(teamId, { $set: { board } });
  },

  "teams.tasks.remove"(taskId, teamId, columnId, taskIndex) {
    check(taskId, String);
    check(teamId, String);
    check(columnId, String);
    check(taskIndex, Number);
    const tasks = TeamsCollection.findOne({ _id: teamId }).board[columnId]
      .tasks;
    tasks.splice(taskIndex, 1);
    return TeamsCollection.update(teamId, {
      $set: {
        [`board.${columnId}.tasks`]: tasks,
      },
    });
  },
});
