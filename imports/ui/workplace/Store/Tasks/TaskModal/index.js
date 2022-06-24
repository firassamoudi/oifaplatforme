import { ReactiveDict } from "meteor/reactive-dict";

export const TaskModalState = new ReactiveDict();

TaskModalState.setDefault("TaskModalState", {
  show: -1,
  edit: false,
});
