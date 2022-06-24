import { ReactiveDict } from "meteor/reactive-dict";

export const TeamData = new ReactiveDict();

TeamData.setDefault("TeamData", {
  title: "",
});

export const TeamToEdit = new ReactiveDict();

TeamToEdit.setDefault("TeamToEdit", {
  id: "",
});

export const CurrentTeam = new ReactiveDict();

TeamToEdit.setDefault("CurrentTeam", {
  id: "",
});
