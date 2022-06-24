import { ReactiveDict } from "meteor/reactive-dict";

export const TaskData = new ReactiveDict();

TaskData.setDefault("TaskData", {
  title: "",
});

export const TaskToEdit = new ReactiveDict();

TaskToEdit.setDefault("TaskToEdit", {
  id: "",
});
