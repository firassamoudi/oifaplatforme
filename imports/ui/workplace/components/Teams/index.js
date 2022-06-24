import "./style.scss";

import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ScrollArea from "react-scrollbars-custom";

import Typography from "../../../common/Typography";
import CreateTeamModal from "../CreateTeamModal";
import EditTeamModal from "../EditTeamModal";
import TeamCard from "../TeamCard/TeamCard";

const WorkplaceTeams = ({ hasRole, data, teamId, teams }) => {
  const history = useHistory();
  // - Team modal
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [editTeamData, setEditTeamData] = useState({
    _id: "",
    title: "",
    members: [],
  });
  // - Create TeamModal
  const onShowCreateTeamModal = () => {
    setShowCreateTeamModal(true);
  };
  const onHideCreateTeamModal = () => {
    setShowCreateTeamModal(false);
  };
  // - Edit TeamModal
  const onShowEditTeamModal = (team) => {
    setEditTeamData({
      _id: team._id,
      title: team.title,
      members: team.members,
    });
    setShowEditTeamModal(true);
  };
  const onHideEditTeamModal = () => {
    setEditTeamData({
      _id: "",
      title: "",
      members: [],
    });
    setShowEditTeamModal(false);
  };
  // - Edit team
  const onEditTeam = (team) => {
    onShowEditTeamModal(team);
  };
  const onDeleteTeam = (team) => {
    Meteor.call("workplace.team.delete", {
      teamId: team._id,
      workplaceId: data._id,
    });
  };
  // ...
  if (!hasRole) return null;
  // ...
  return (
    <Box className="WorkplaceTeams">
      <Box className="WorkplaceTeams__header">
        <Typography size="1.6rem" face="Medium" color="#021C30">
          All Teams
        </Typography>
        <AddCircleIcon
          onClick={onShowCreateTeamModal}
          style={{
            fontSize: "2.3rem",
            color: "#03256C",
            cursor: "pointer",
          }}
        />
      </Box>
      <ScrollArea style={{ width: "100%", height: "100%" }}>
        <Box className="WorkplaceTeams__body">
          <Box component="ul" className="WorkplaceTeams__teamCardList">
            {teams.map((team) => (
              <TeamCard
                key={team._id}
                // ...
                data={team}
                workplace={data}
                active={teamId === team._id}
                onEditTeam={onEditTeam}
                onDeleteTeam={onDeleteTeam}
              />
            ))}
          </Box>
        </Box>
      </ScrollArea>

      <CreateTeamModal
        open={showCreateTeamModal}
        closeModal={onHideCreateTeamModal}
      />
      <EditTeamModal
        open={showEditTeamModal}
        edit={editTeamData}
        closeModal={onHideEditTeamModal}
      />
    </Box>
  );
};

export default WorkplaceTeams;
