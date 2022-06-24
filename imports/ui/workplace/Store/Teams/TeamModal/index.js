import { ReactiveDict } from "meteor/reactive-dict";

export const TeamModalState = new ReactiveDict();

TeamModalState.setDefault("TeamModalState", {
  show: false,
  edit: false,
});
