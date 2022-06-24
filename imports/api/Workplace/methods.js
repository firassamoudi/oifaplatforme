/* eslint-disable sonarjs/no-identical-functions */
import { Meteor } from "meteor/meteor";

import TeamCollection from "../Team";
import WorkplaceCollection from ".";

Meteor.methods({
  "workplace.publish"({ workplaceId }) {
    WorkplaceCollection.update(
      { _id: workplaceId },
      { $set: { published: true } }
    );
  },
  "workplace.team.insert"({ workplaceId, data }) {
    TeamCollection.insert({ ...data, workplaceId });
  },
  "workplace.team.update"({ workplaceId, teamId, data }) {
    TeamCollection.update({ _id: teamId, workplaceId }, { $set: { ...data } });
  },
  "workplace.team.delete"({ workplaceId, teamId }) {
    TeamCollection.remove({ _id: teamId, workplaceId });
  },
  "workplace.task.insert"({ workplaceId, teamId, taskTeams, columnId, data }) {
    const teams = [teamId, ...taskTeams];
    teams.forEach((teamId) => {
      TeamCollection.update(
        { _id: teamId, workplaceId },
        { $push: { [`board.${columnId}`]: data } }
      );
    });
  },
  "workplace.task.update"({ workplaceId, teamId, columnId, data }) {
    const team = TeamCollection.findOne({ _id: teamId, workplaceId });
    const tasks = team?.board?.[columnId] || [];
    // ...
    const newTasks = tasks.map((task) =>
      task.key === data.key ? { ...data } : { ...task }
    );
    // ...
    TeamCollection.update(
      { _id: teamId, workplaceId },
      { $set: { [`board.${columnId}`]: newTasks } }
    );
  },
  "workplace.task.delete"({ workplaceId, teamId, columnId, data }) {
    TeamCollection.update(
      { _id: teamId, workplaceId },
      { $pull: { [`board.${columnId}`]: { key: data.key } } }
    );
  },
  "workplace.task.drag"({ workplaceId, teamId, data }) {
    const board = {
      todo: data[0].tasks,
      doing: data[1].tasks,
      done: data[2].tasks,
    };
    // ...
    TeamCollection.update({ _id: teamId, workplaceId }, { $set: { board } });
  },
  // - Messages
  "workplace.team.message.insert"({ workplaceId, teamId, data }) {
    const createdAt = new Date();
    const message = { ...data, createdAt };
    // ...
    TeamCollection.update(
      { _id: teamId, workplaceId },
      { $push: { messages: message } }
    );
  },
});
