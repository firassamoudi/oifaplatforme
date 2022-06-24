import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ApplicationCollection from "/imports/api/Application";
import SolverCollection from "/imports/api/Solver";
import TeamsCollection from "/imports/api/Team";

import Button from "../../../common/Button";
import { EntryAutocomplete, EntryText } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const solverOption = (solver) => {
  const name = solver.organization || `${solver.firstName} ${solver.lastName}`;
  return {
    _id: solver._id,
    label: name,
    value: solver._id,
  };
};

const CreateTeamModal = ({ open, closeModal, workplaceId, solvers, teams }) => {
  // - Solvers
  // const solverOnGoing = [...solvers].filter((solver) => {
  //   const solverApp = ApplicationCollection.findOne({ solverId: solver._id });
  //   return !solverApp.dropped;
  // });
  const solverOnGoing = [...solvers];
  // - Teams
  const [teamData, setTeamData] = useState({ title: "", members: [] });
  const onInputChange = (inp) => {
    setTeamData((state) => ({ ...state, ...inp }));
  };
  // - Modal
  const onCloseModal = () => {
    closeModal();
    setTeamData({ title: "", members: [] });
  };
  // ...
  const onCreateNewTeam = () => {
    const team = {
      title: teamData.title,
      members: teamData.members.map((member) => member._id),
    };
    // ...
    Meteor.call(
      "workplace.team.insert",
      {
        data: team,
        workplaceId,
      },
      (err) => {
        if (err) return;
        onCloseModal();
      }
    );
  };
  // - Options
  const options = solverOnGoing.map(solverOption).filter((solver) => {
    let isExist = false;
    teams.forEach((team) => {
      if (team.members.indexOf(solver._id) > -1) {
        isExist = true;
      }
    });
    // ...
    return !isExist;
  });
  // ...
  return (
    <Modal
      className="CreateTeamModal"
      title="Create new team"
      open={open}
      closeModal={onCloseModal}
    >
      <Box className="CreateTeamModal__body">
        <EntryText
          label="Team title"
          placeholder="Name the team"
          onInputChange={onInputChange}
          name="title"
          value={teamData.title}
        />
        <EntryAutocomplete
          multiline
          label="Team members"
          name="members"
          placeholder="ex: member name"
          value={teamData.members}
          onInputChange={onInputChange}
          options={[...options]}
        />
      </Box>
      <Box className="CreateTeamModal__footer">
        <Button small ghost onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          small
          onClick={onCreateNewTeam}
          disabled={!teamData.title || !teamData.members.length}
        >
          Create Team
        </Button>
      </Box>
    </Modal>
  );
};

export default withTracker(({ open, closeModal }) => {
  const params = useParams();
  const workplaceId = params.workplaceId;
  const handle = Meteor.subscribe("workplace", { workplaceId });
  if (!handle.ready()) {
    return {
      open,
      closeModal,
      workplaceId,
      solvers: [],
      teams: [],
    };
  }
  const solvers = SolverCollection.find({}).fetch();
  const teams = TeamsCollection.find({ workplaceId }).fetch();
  return { open, closeModal, workplaceId, solvers, teams };
})(CreateTeamModal);
