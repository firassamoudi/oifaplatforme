// const { TaskModalState, TaskData } = require("../index");

import { TaskData, TaskModalState, TaskToEdit } from "../../..";

export const handleOpenTaskModal = (show, edit, task) => {
  TaskModalState.set("TaskModalState", {
    show,
    edit: !!edit,
  });

  if (edit) {
    TaskData.set("TaskData", {
      title: task.title,
    });

    TaskToEdit.set("TaskToEdit", { id: task._id });
  }
};

export const handleCloseTaskModal = () => {
  TaskModalState.set("TaskModalState", {
    index: -1,
    edit: false,
  });
  TaskData.set("TaskData", { title: "" });
  TaskToEdit.set("TaskToEdit", { id: "" });
};
