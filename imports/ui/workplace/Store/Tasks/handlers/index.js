export const handelAddTask = (teamId, columnId, title) => {
  Meteor.call("tasks.insert", teamId, columnId, title);
};

export const handelDelTask = (task, teamId, columnId, taskIndex) => {
  // "to retrive tasks.remove";
  // "teams.tasks.remove : working";

  Meteor.call("tasks.remove", task, teamId, columnId, taskIndex);
};

export const handelEditTask = (taskId, title) => {
  Meteor.call("tasks.update", taskId, title);
};

export const handelDragTask = (results, teamId, sourceCol) => {
  Meteor.call("teams.tasks.update", results, teamId, sourceCol);
};
