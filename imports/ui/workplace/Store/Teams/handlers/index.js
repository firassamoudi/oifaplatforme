import { TeamData } from "../..";

export const handelAddTeams = (title) => {
  Meteor.call("teams.insert", title);
};

export const handelEditTeams = (team, title) => {
  TeamData.set("TeamData", { title });
  Meteor.call("teams.update", team, title);
};

export const handelDelTeam = (team) => {
  Meteor.call("teams.remove", team);
};
