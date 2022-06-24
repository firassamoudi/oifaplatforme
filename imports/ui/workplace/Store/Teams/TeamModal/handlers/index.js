const { TeamModalState, TeamData, TeamToEdit } = require("../../..");

export const handleOpenTeamModal = (e, edit, team) => {
  TeamModalState.set("TeamModalState", { show: true, edit: !!edit });
  if (edit) {
    TeamData.set("TeamData", { title: team.teamName });
    TeamToEdit.set("TeamToEdit", { id: team._id });
  }
};

export const handleCloseTeamModal = () => {
  TeamModalState.set("TeamModalState", { show: false, edit: false });
  TeamData.set("TeamData", { title: "" });
  TeamToEdit.set("TeamToEdit", { id: "" });
};
