import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
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

const EditTeamModal = ({
  edit,
  open,
  closeModal,
  workplaceId,
  solvers,
  teams,
}) => {
  // - Solvers
  const solverOnGoing = [...solvers].filter((solver) => {
    const solverApp = ApplicationCollection.findOne({ solverId: solver._id });
    return !solverApp.dropped;
  });
  // - Teams
  const [teamData, setTeamData] = useState({
    _id: edit._id,
    title: edit.title,
    members: edit.members,
  });
  const onInputChange = (inp) => {
    setTeamData((state) => ({ ...state, ...inp }));
  };
  // - Modal
  const onCloseModal = () => {
    closeModal();
    setTeamData({ title: "", members: [] });
  };
  // ...
  const onEditNewTeam = () => {
    const team = {
      title: teamData.title,
      members: teamData.members, // .map((member) => member._id),
    };
    // ...
    Meteor.call(
      "workplace.team.update",
      {
        teamId: teamData._id,
        data: team,
        workplaceId,
      },
      (err) => {
        if (err) return;
        onCloseModal();
      }
    );
  };
  // - Value
  const value = teamData.members
    .filter((member) => !!member)
    .map((member) => {
      if (typeof member !== "string") return member;
      const solver = SolverCollection.findOne({ _id: member });
      return solverOption(solver);
    });
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
  useEffect(() => {
    setTeamData({ _id: edit._id, title: edit.title, members: edit.members });
  }, [edit]);
  // ...
  return (
    <Modal
      className="EditTeamModal"
      title="Edit team"
      open={open}
      closeModal={onCloseModal}
    >
      <Box className="EditTeamModal__body">
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
          value={value}
          onInputChange={onInputChange}
          options={[...options]}
        />
      </Box>
      <Box className="EditTeamModal__footer">
        <Button small ghost onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          small
          onClick={onEditNewTeam}
          disabled={!teamData.title || !teamData.members.length}
        >
          Edit Team
        </Button>
      </Box>
    </Modal>
  );
};

export default withTracker(({ edit, open, closeModal }) => {
  const params = useParams();
  const workplaceId = params.workplaceId;
  const handle = Meteor.subscribe("workplace", { workplaceId });
  if (!handle.ready()) {
    return {
      edit,
      open,
      closeModal,
      workplaceId,
      solvers: [],
      teams: [],
    };
  }
  const solvers = SolverCollection.find({}).fetch();
  const teams = TeamsCollection.find({ workplaceId }).fetch();
  return { edit, open, closeModal, workplaceId, solvers, teams };
})(EditTeamModal);
